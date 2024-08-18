'use client';

import Image from "next/image";
import styles from "@/app/page.module.css";
import type { FormProps } from 'antd';
import { Button, Checkbox, Form as AntdForm, Input } from 'antd';
import React ,{useEffect} from "react";
import Search from "antd/es/transfer/search";
import { Card } from 'antd';
import { Carousel } from 'antd';
import { title } from "process";


const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const { Meta } = Card;
type Movie  = {
    Title:string
    Year: number
    imdbID: String
    Type : string 
    Poster : string 

}

type Search ={
  Search : Movie [];
  totalResults: number
  response : boolean
}
export default function Movies() {
  const [data, setData]: [Search,any]= React.useState({Search:[],totalResults: 0,response : false  } );
  const [loading , setLoading]  = React.useState(false);

  
  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    setLoading(true);
    const response = await fetch("https://www.omdbapi.com/?apikey=8bdf708a&s=hangover");
    setData(await response.json());
    setLoading(false);
  };
  

function renderPosts() {
  return data.Search.map((post : Movie, index: number ) => {
    return (
      
        <Card
        key={index}
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src={post.Poster} />}
  >
    <Meta title={post.Title} description={post.Year}  />
  </Card>
    
    );
  });
}


return (
  <main className={styles.main}>
  
   
 
  {/* <Carousel arrows infinite={false}> */}
  { renderPosts()}
      {/* </Carousel> */}
   
    
  
  </main>
  );
}
  
  

