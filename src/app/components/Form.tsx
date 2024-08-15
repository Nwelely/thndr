'use client';

import Image from "next/image";
import styles from "./page.module.css";
import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form as AntdForm, Input } from 'antd';
import RefAutoComplete from "antd/es/auto-complete";

type LoginFormProps = {
    name:string
}

export default function Form ({}: FormProps) {
  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  }
  
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }; 
    return (
        <AntdForm
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <AntdForm.Item<FieldType>
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </AntdForm.Item>

    <AntdForm.Item<FieldType>
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </AntdForm.Item>

    <AntdForm.Item<FieldType>
      name="remember"
      valuePropName="checked"
      wrapperCol={{ offset: 8, span: 16 }}
    >
      <Checkbox>Remember me</Checkbox>
    </AntdForm.Item>

    <AntdForm.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </AntdForm.Item>
  </AntdForm>

    )
  
      
  };


  
  

