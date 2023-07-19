import { Layout, Modal } from 'antd'
import React, { useState } from 'react'
import { Button, Checkbox, Form, Input } from 'antd';

type Props = {}

const { Header } = Layout;

export default function HeaderBar({ }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };






    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-red-50 text-sm py-4 dark:bg-gray-900">
            <Modal title="Log In Here." open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[

            ]}>

                <Form
                className='pt-12'
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

            

                    <Form.Item className=' flex justify-end'>
                        <Button type="default" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
                <a className="flex-none text-xl font-semibold dark:text-white" href="#">Auction App</a>
                <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:pl-5">
                    <a onClick={showModal} className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500" href="#">Account</a>
                    <a className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500" href="#">Account</a>
                </div>
            </nav>
        </header>
    )
}