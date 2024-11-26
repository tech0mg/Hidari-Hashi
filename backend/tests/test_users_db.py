import unittest
from database.users_db import create_user, get_users, get_user_by_id
from database.connection import get_connection

class TestUsersDB(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        # テスト用データベースのセットアップ。テストの前に users テーブルを作成し、テスト用の環境を整えます。
        with get_connection() as conn:
            conn.execute("DROP TABLE IF EXISTS users")
            conn.execute("""
                CREATE TABLE users (
                    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT NOT NULL,
                    password TEXT NOT NULL,
                    address TEXT NOT NULL
                )
            """)

    def test_create_user(self):
        # ユーザーを作成
        create_user(
            username="test_user",
            password="secure_password",
            address="123 Test Street"
        )

        # データベースに正しく保存されているか確認。少なくとも1件のユーザーが存在するかをテスト
        with get_connection() as conn:
            result = conn.execute("SELECT * FROM users WHERE username = ?", ("test_user",)).fetchone()
            self.assertIsNotNone(result)
            self.assertEqual(result["username"], "test_user")
            self.assertEqual(result["password"], "secure_password")
            self.assertEqual(result["address"], "123 Test Street")

    def test_get_users(self):
        # すでにデータが存在することを確認。ユーザーIDで取得した情報が正しいかをテスト
        users = get_users()
        self.assertIsInstance(users, list)
        self.assertGreaterEqual(len(users), 1)  # 少なくとも1件のユーザーが存在する
        self.assertEqual(users[0]["username"], "test_user")

    def test_get_user_by_id(self):
        # ユーザーを取得
        users = get_users()
        user_id = users[0]["user_id"]
        user = get_user_by_id(user_id)

        # ユーザー情報の確認
        self.assertIsNotNone(user)
        self.assertEqual(user["username"], "test_user")
        self.assertEqual(user["address"], "123 Test Street")

if __name__ == "__main__":
    unittest.main()

#以下のコマンドでテストを実行します。
#python -m unittest discover tests



