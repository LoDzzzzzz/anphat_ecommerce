import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { login } from "../libs/auth";
import AppContext from "../context/AppContext";
import Head from 'next/head'
import Link from "next/dist/client/link";
import getStrapiMedia from "../libs/media";
import { GlobalContext } from "./_app";

export default function Login() {
    const [data, updateData] = useState({ identifier: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const router = useRouter();
    const appContext = useContext(AppContext);
    const global = appContext.global
    
    useEffect(() => {
        if(appContext.isAuthenticated) return router.push('/') 
    }, [appContext]);

    function onChange(event) {
    updateData({ ...data, [event.target.name]: event.target.value });
    }

    return (
        <div id="login">
            <Head>
                <title>Đăng nhập</title>
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
                    <div className="form-group group-input--email">
                        <label htmlFor="exampleInputEmail1">Email đăng nhập</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        onChange={(event) => onChange(event)}
                        name="identifier" />
                        <span id="emailHelp" className="form-text text-muted">Vui lòng điền email của bạn.</span>
                    </div>
                    <div className="form-group group-input--password">
                        <label htmlFor="exampleInputPassword1">Mật khẩu</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"
                        onChange={(event) => onChange(event)}
                        name="password" />
                        <span id="emailHelp" className="form-text text-muted">Vui lòng điền mật khẩu của bạn.</span>
                    </div>
                    
                    <button type="submit" className="btn w-100"
                    onClick={(e) => {
                        e.preventDefault()
                        setLoading(true);
                        login(data.identifier, data.password)
                        .then((res) => {
                            setLoading(false);
                            // set authed User in global context to update header/app state
                            appContext.setUser(res.data.user);
                        })
                        .catch((error) => {
                            setError(error.response.data);
                            setLoading(false);
                        });
                    }}
                    >
                    {loading ? "Loading... " : "Đăng nhập"}
                    </button>

                    <p className="my-2">
                        Bạn chưa có tài khoản ? <Link href="/register"><a style={{color: 'var(--primary-color)'}}>Đăng ký ngay</a></Link>
                    </p>
                </div>
            </form>
        </div>
    )
}
