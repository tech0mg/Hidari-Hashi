"use client";
import React, { useState } from "react";

const AccountRegister = () => {
  const [parentName, setParentName] = useState("");
  const [childName, setChildName] = useState("");
  const [gender, setGender] = useState("");
  const [grade, setGrade] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      parentName,
      childName,
      gender,
      grade,
      email,
      password,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      alert("登録が成功しました！");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">アカウント登録</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">保護者のニックネーム</label>
          <input
            type="text"
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
            className="block w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">お子様のニックネーム</label>
          <input
            type="text"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            className="block w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">お子様の性別</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="block w-full p-2 border rounded"
          >
            <option value="">性別を選択してください</option>
            <option value="男">男</option>
            <option value="女">女</option>
            <option value="回答しない">回答しない</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">学年</label>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="block w-full p-2 border rounded"
          >
            <option value="">学年を選択してください</option>
            <option value="未就学児">未就学児</option>
            <option value="小学校低学年">小学校低学年</option>
            <option value="小学校中学年">小学校中学年</option>
            <option value="小学校高学年">小学校高学年</option>
            <option value="中学生以上">中学生以上</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">メールアドレス</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">パスワード</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">確認用パスワード</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          確認画面へ
        </button>
      </form>
    </div>
  );
};

export default AccountRegister;
