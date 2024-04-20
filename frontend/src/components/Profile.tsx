'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react'

type Account = {
    username: string;
}

type Stats = {
    account: Account;
    score: number;
    wins: number;
    losses: number;
    difficulty: string;
}

const Profile = () => {
    const [data, setData] = useState<Stats[]>([]);

    const load = async () => {
        const response = await axios.get(`/api/stats/findAllStatsByPlayer`);
        setData(response.data);
        console.log(response.data)
    }

    useEffect(() => {
        load();
    }, [])

  return (
    <div className=''>
        {data.map((item, index) => (
            <div key={index} className=''>
                <div className=''>{item.account.username}</div>
                <div className=''>{item.score}</div>
                <div className=''>{item.wins}</div>
                <div className=''>{item.losses}</div>
                <div className=''>{item.difficulty}</div>
            </div>
        ))}
    </div>
  )
}

export default Profile