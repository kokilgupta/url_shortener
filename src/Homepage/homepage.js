import React, { useState, useEffect } from 'react';
import shortid from 'shortid';
import db from '../firebase/firestore';
import { Formik, Field, Form, ErrorMessage } from "formik";
import './homepage.css';
import { Spin } from 'antd';
import * as yup from 'yup';
import Header from "../header/Header";
import env from "react-dotenv";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Tooltip } from 'antd';
import { Popconfirm } from 'antd';

const url_validation = yup.object().shape({
    url: yup
        .string()
        .required('Enter a url')
        .matches(
            /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
            'Enter correct url!'
        )
});

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const onClickHandler = (values) => {
        const shorten = shortid.generate();
        db.collection("URL").add({
            url: values.url,
            shortened_url: shorten,
            user_id: "kokil"
        })
            .then((docRef) => {
                //console.log("Document written with ID: ", docRef.path);
                const vari = docRef.path;
                const l = vari.length;
                const var2 = vari.slice(4, l);
                var docRef = db.collection("URL").doc(var2);
                docRef.get().then((doc) => {
                    if (doc.exists) {
                        setPosts(posts => [doc.data(), ...posts]);
                    } else {
                        console.log("No such document!");
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                });
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = db.collection('URL');
            const data = await res.get();
            data.docs.map((doc) => {
                const data = {
                    id: doc.id,
                    ...doc.data()
                }
                posts.push(data);
            });
        }
        fetchData().then(() => setIsLoaded(true));
    }, []);

    const deletLinkHandler = async (id) => {
        const res = await db
            .collection('URL')
            .doc(id)
            .delete()
            .then(() => {
                setPosts([...posts.filter((posts) => posts.id !== id)]);
            });
    }

    if (!isLoaded) {
        return (
            <div className={'spinner'}><Spin size={'large'} /></div>
        )
    }
    return (
        <div>
            {/* {console.log(env.databaseURL)}  */}
            <Header />
            <div className={'url-page'}>
                <div className={'url-form'}>
                    <Formik
                        initialValues={{ url: "" }}
                        validationSchema={url_validation}
                        onSubmit={async (values, actions) => {
                            await onClickHandler(values);
                            actions.resetForm({});
                        }}
                    >
                        <Form>
                            <div className={'url-short-title'}>Enter the url to be shortened</div>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
                                    <Field name='url' type="text" placeholder={'Enter url'} className={'url-field'} />
                                    <div className={'error-message'}>
                                        <ErrorMessage name={'url'} />
                                    </div>
                                </div>
                                <button type="submit" className={'url-button'}>Shorten</button>
                            </div>
                        </Form>
                    </Formik>
                </div>
                <div className={'list-parent'}>
                    {posts.map((item) => (
                        <div className={'parent'} key={item.shortened_url}>
                            <div key={item.shortened_url} className={'link_box'}>
                                <div className={'delete'}>
                                    <Popconfirm title="Are you sure you want to delete this item???" okText="Yes" cancelText="No" onConfirm={() => deletLinkHandler(item.id)}>
                                        <i class="fa fa-times"></i>
                                    </Popconfirm>
                                </div>
                                <div className={'links'}>
                                    <span><b>{env.base_url}{item.shortened_url}</b></span>
                                    <CopyToClipboard
                                        text={`${env.base_url}${item.shortened_url}`}
                                        className={'shorten-url'}
                                        onCopy={() => alert('Copied to Clipboard !!')}
                                    >
                                        <Tooltip title="Click to Copy">
                                            <CopyOutlined style={{ text: 'red' }} />
                                        </Tooltip>
                                    </CopyToClipboard>
                                    <div>{item.url}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default HomePage;