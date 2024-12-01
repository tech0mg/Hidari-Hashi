"use client"; // 必須ディレクティブ

import { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({
    parent_nickname: '',
    child_nickname: '',
    gender: '',
    grade: '',
    location: '',
    email: '',
    password: '',
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${apiUrl}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <div style={{
      maxWidth: '500px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f0f8ff',
      borderRadius: '10px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ textAlign: 'center' }}>アカウント登録</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* 保護者のニックネーム */}
        <label>
          保護者のニックネーム
          <input name="parent_nickname" type="text" onChange={handleChange} required />
        </label>

        {/* お子様のニックネーム */}
        <label>
          お子様のニックネーム
          <input name="child_nickname" type="text" onChange={handleChange} required />
        </label>

        {/* お子様の性別 */}
        <label>
          お子様の性別
          <select name="gender" onChange={handleChange} required>
            <option value="">性別を選択してください</option>
            <option value="男">男</option>
            <option value="女">女</option>
            <option value="回答しない">回答しない</option>
          </select>
        </label>

        {/* 学年 */}
        <label>
          学年
          <select name="grade" onChange={handleChange} required>
            <option value="">学年を選択してください</option>
            <option value="未就学児">未就学児</option>
            <option value="小学1年生">小学1年生</option>
            <option value="小学2年生">小学2年生</option>
            <option value="小学3年生">小学3年生</option>
            <option value="小学4年生">小学4年生</option>
            <option value="小学5年生">小学5年生</option>
            <option value="小学6年生">小学6年生</option>
            <option value="中学生以上">中学生以上</option>
          </select>
        </label>

        {/* 出発地 */}
        <label>
          出発地
          <input name="location" type="text" onChange={handleChange} required />
        </label>

        {/* メールアドレス */}
        <label>
          メールアドレス
          <input name="email" type="email" onChange={handleChange} required />
        </label>

        {/* パスワード */}
        <label>
          パスワード
          <input name="password" type="password" onChange={handleChange} required />
        </label>

        {/* 確認画面へボタン */}
        <button type="submit" style={{
          padding: '10px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>確認画面へ</button>
      </form>
    </div>
  );
}
