import sqlite3
from contextlib import contextmanager

# データベースのファイル名
DATABASE_NAME = "shiori_db.py"

@contextmanager
def get_connection():
    """
    SQLiteデータベースとの接続を確立し、終了時に自動でクローズするコンテキストマネージャ。
    """
    connection = None
    try:
        # データベース接続を確立
        connection = sqlite3.connect(DATABASE_NAME)
        # 行を辞書型で返すように設定
        connection.row_factory = sqlite3.Row
        yield connection
    finally:
        # 接続を閉じる
        if connection:
            connection.close()
