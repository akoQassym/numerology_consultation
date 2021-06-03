import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { AreaChart, linearGradient, Area, defs, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import s from "./MainFile.module.scss";
import Loading from "../loading/Loading";
import Nav from "./Nav";


export default function Admin() {
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    const [stats, setStats] = useState(null)

    const credentials = {
        login: localStorage.getItem("login"),
        token: localStorage.getItem("token")
    }

    useEffect(() => {
        if (stats == null) {
            getStats()
        }
    })

    async function getStats() {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': `Token ${credentials.token}`}
        }
        fetch('/api/admin-stats', requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    localStorage.clear();
                    history.push("/")
                }
            })
            .then((data) => {
                setStats(data);
                setLoading(false);
            })
    }


    if ((localStorage.getItem("token") == null) || (localStorage.getItem("login") == null)) {
      return <Redirect to="/login" />
    }

    if (loading) {
        return <Loading />
    } else {
        return (
          <div className={s.structure}>
              <Nav />

              <p className={s.title}>Статистика покупок консультаций</p>

              <div className={s.graphDiv}>
                  <AreaChart width={1000} height={400} data={stats}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#eec96d" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#eec96d" stopOpacity={0}/>
                          </linearGradient>
                      </defs>
                      <XAxis dataKey="name" />
                      <YAxis/>
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Area type="monotone" dataKey="bought" stroke="#eec96d" fillOpacity={1} fill="url(#colorUv)" />
                  </AreaChart>
              </div>
          </div>
        )
    }
}