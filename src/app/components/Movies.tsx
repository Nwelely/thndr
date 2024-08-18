'use client';

import Image from "next/image";
import styles from "@/app/page.module.css";
import type { FormProps } from 'antd';
import { Button, Checkbox, Form as AntdForm,  } from 'antd';
import React ,{useEffect} from "react";
import { Card } from 'antd';
import  { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import type { GetProps } from 'antd';
import {  Result } from 'antd';
import { Spin } from 'antd';

const { Search } = Input;


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
  Response : string
}
export default function Movies() {
  const [data, setData]: [Search,any]= React.useState({Search:[],totalResults: 0,Response : "False"  } );
  const [loading , setLoading]  = React.useState(false);


  const fetchData = async (movieName:string) => {
    console.log({movieName})
    setLoading(true);
    const response = await fetch(`https://www.omdbapi.com/?apikey=8bdf708a&s=${movieName}`);
    const data1 = await response.json()
    setData(data1);
    setLoading(false);
  };
  

  function renderPosts() {
    return (
      <div>
    {
      data.Search?.map((post: Movie, index: number) => (
          <div key={index}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src={post.Poster} />}
            >
              <Meta title={post.Title} description={post.Year} />
            </Card>
          </div>
        ))
      }
      </div>
    );
  }  

return (
  <main className={styles.main}>
         <Search
      placeholder="input search text"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={fetchData}
    />
  {loading ?  <Spin /> : data?.Response !== 'False' ?  renderPosts() : <h1> <Result
    status="500"
    title=" No Data"
  
   
  /></h1>}
  </main>
  );
}
  
  

