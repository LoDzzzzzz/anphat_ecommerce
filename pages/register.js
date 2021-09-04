import React, { useContext, useEffect, useState } from 'react'
import { registerUser } from '../libs/auth'
import AppContext from '../context/AppContext'
import Head from 'next/head'
import Link from 'next/dist/client/link'
import { GlobalContext } from './_app'
import getStrapiMedia from '../libs/media'
import { useRouter } from 'next/router'

export default function register() {
    const [data, setData] = useState({ email: "", username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const appContext = useContext(AppContext);
    const global = appContext.global
    const router = useRouter()

    useEffect(() => {
        if(appContext.isAuthenticated) return router.push('/') 
    }, [appContext]);

    return (
        <div id="register">
            <Head>
                <title>Đăng ký</title>
            </Head>
            <form className="mx-auto my-4" style={{maxWidth: '500px'}}>
                <div className="logo">
                    <img src={getStrapiMedia(global.logo_1)} alt="logo" />
                </div>
                <hr />
                {Object.entries(error).length !== 0 &&
                    error.constructor === Object &&
                    error.message.map((error) => {
                    return (
                        <div
                        key={error.messages[0].id}
                        style={{ marginBottom: 10 }}
                        >
                        <small style={{ color: "red" }}>
                            {error.messages[0].message}
                        </small>
                        </div>
                    );
                })}
                <div className="form-input">
                    <div className="form-group group-input--name">
                        <label htmlFor="name">Họ và Tên</label>
                        <input type="text" className="form-control" id="username" 
                        disabled={loading}
                        name="username" value={data.username} 
                        onChange={(e) => setData({ ...data, username: e.target.value })} />
                        <span id="emailHelp" className="form-text text-muted">Vui lòng điền tên của bạn.</span>
                    </div>

                    <div className="form-group group-input--phone">
                        <label htmlFor="phone">Số điện thoại</label>
                        <input type="text" className="form-control" id="phone" 
                        disabled={loading}
                        name="phone" value={data.phone} 
                        onChange={(e) => setData({ ...data, phone: e.target.value })} />
                        <span id="phoneHelp" className="form-text text-muted">Vui lòng điền số điện thoại.</span>
                    </div>

                    <div className="form-group group-input--email">
                        <label htmlFor="exampleInputEmail1">Địa chỉ email</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        name="email" value={data.email} 
                        onChange={(e) => setData({ ...data, email: e.target.value })} />
                        <span id="emailHelp" className="form-text text-muted">Vui lòng điền email của bạn.</span>
                    </div>

                    <div className="form-group group-input--password">
                        <label htmlFor="exampleInputPassword">Mật khẩu</label>
                        <input type="password" className="form-control" id="exampleInputPassword"
                        name="password" value={data.password} 
                        onChange={(e) => setData({ ...data, password: e.target.value })} />
                        <span id="emailHelp" className="form-text text-muted">Vui lòng lưu lại mật khẩu của bạn.</span>
                    </div>
                    
                    <button type="submit" className="btn w-100"
                        disabled={loading}
                        onClick={(e) => {
                        e.preventDefault()
                        setLoading(true);
                        registerUser(data.username, data.email, data.password)
                            .then((res) => {
                            // set authed user in global context object
                            appContext.setUser(res.data.user);
                            setLoading(false);
                            })
                            .catch((error) => {
                            setError(error.response.data);
                            setLoading(false);
                            });
                        }}>
                        {loading ? "Loading.." : "Đăng ký"}
                    </button>

                    <p className="my-2">
                        Bạn đã có tài khoản ? <Link href="/login"><a style={{color: 'var(--primary-color)'}}>Đăng nhập ngay</a></Link>
                    </p>
                </div>
            </form>
        </div>
    )
}
