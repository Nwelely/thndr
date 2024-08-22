'use client';

import styles from "@/app/page.module.css";
import { Card, Input, Result, Spin } from 'antd';
import React, { useState, useRef, useCallback, useEffect } from "react";
import { useInfiniteQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";

const { Search } = Input;
const { Meta } = Card;

const queryClient = new QueryClient();

type Movie = {
  Title: string;
  Year: number;
  imdbID: string;
  Type: string;
  Poster: string;
};

type SearchResponse = {
  Search: Movie[];
  totalResults: string;
  Response: string;
  page: number;
};

type ErrorResponse = {
  Response: "False";
  Error: string;
};

const fetchMovies = async ({ queryKey, pageParam = 1 }: any) => {
  const searchTerm = queryKey[0];
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=8bdf708a&s=${searchTerm}&page=${pageParam}`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok.");
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "Unknown error occurred.");
  }

  return { ...data, page: pageParam };
};

function Movies() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const listInnerRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: [searchTerm],
    queryFn: fetchMovies,
    getNextPageParam: (lastPage) => {
      const totalResults = parseInt(lastPage.totalResults, 10);
      const maxPages = Math.ceil(totalResults / 10);
      if (lastPage.page < maxPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: !!searchTerm,
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value || "");
  };

  const renderPosts = () => {
    const allMovies = data?.pages.flatMap(page => page.Search) || [];

    return (
      <div className={styles.gridContainer}>
        {allMovies.map((movie, index) => (
          <Card
            key={`${movie.imdbID}-${index}`}
            hoverable
            style={{ width: 240, marginBottom: 16 }}
            cover={<img alt={movie.Title} src={movie.Poster} />}
          >
            <Meta title={movie.Title} description={movie.Year} />
          </Card>
        ))}
        {isFetchingNextPage && <Spin />}
      </div>
    );
  };

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 5 && !isFetchingNextPage && hasNextPage) {
        fetchNextPage();
      }
    }
  };

  useEffect(() => {
    const ref = listInnerRef.current;
    if (ref) {
      ref.addEventListener('scroll', onScroll);
    }
    return () => {
      if (ref) {
        ref.removeEventListener('scroll', onScroll);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <main className={styles.main}>
      <Search
        style={{ marginBottom: 16 }}
        placeholder="Search movies..."
        allowClear
        enterButton="Search"
        size="large"
        onSearch={handleSearch}
      />
      <div
        ref={listInnerRef}
        style={{ height: "600px", overflowY: "auto" }}
      >
        {isLoading ? (
          <Spin />
        ) : isError ? (
          <Result status="500" title={`Error: ${error.message}`} />
        ) : (data?.pages[0].Response === 'False') ? (
          <Result status="500" title="No Data" />
        ) : (
          renderPosts()
        )}
      </div>
    </main>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Movies />
    </QueryClientProvider>
  );
}
