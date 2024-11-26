from database.connection import get_connection

def create_users_table():
    """
    users テーブルと users_child テーブルを作成する関数。
    """
    with get_connection() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                address TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        conn.execute("""
            CREATE TABLE IF NOT EXISTS users_child (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                child_name TEXT NOT NULL,
                age INTEGER,
                sex TEXT,
                FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
            )
        """)

def add_user(username, email, password, address=None):
    """
    新しいユーザーを追加する関数。
    """
    with get_connection() as conn:
        conn.execute("""
            INSERT INTO users (username, email, password, address)
            VALUES (?, ?, ?, ?)
        """, (username, email, password, address))

def get_user_by_id(user_id):
    """
    特定のユーザーIDからユーザー情報を取得する関数。
    """
    with get_connection() as conn:
        return conn.execute("""
            SELECT * FROM users
            WHERE id = ?
        """, (user_id,)).fetchone()

def get_user_by_email(email):
    """
    特定のメールアドレスからユーザー情報を取得する関数。
    """
    with get_connection() as conn:
        return conn.execute("""
            SELECT * FROM users
            WHERE email = ?
        """, (email,)).fetchone()

def add_child_to_user(user_id, child_name, age, sex):
    """
    特定のユーザーに子供情報を追加する関数。
    """
    with get_connection() as conn:
        conn.execute("""
            INSERT INTO users_child (user_id, child_name, age, sex)
            VALUES (?, ?, ?, ?)
        """, (user_id, child_name, age, sex))

def get_children_by_user_id(user_id):
    """
    特定のユーザーIDに関連付けられた子供情報を取得する関数。
    """
    with get_connection() as conn:
        return conn.execute("""
            SELECT * FROM users_child
            WHERE user_id = ?
        """, (user_id,)).fetchall()

def update_user(user_id, username=None, email=None, password=None, address=None):
    """
    特定のユーザー情報を更新する関数。
    """
    with get_connection() as conn:
        fields = []
        values = []

        if username is not None:
            fields.append("username = ?")
            values.append(username)
        if email is not None:
            fields.append("email = ?")
            values.append(email)
        if password is not None:
            fields.append("password = ?")
            values.append(password)
        if address is not None:
            fields.append("address = ?")
            values.append(address)

        values.append(user_id)
        query = f"""
            UPDATE users
            SET {', '.join(fields)}
            WHERE id = ?
        """
        conn.execute(query, tuple(values))

def delete_user(user_id):
    """
    特定のユーザーを削除する関数（子供情報もカスケードで削除）。
    """
    with get_connection() as conn:
        conn.execute("""
            DELETE FROM users
            WHERE id = ?
        """, (user_id,))

def delete_child(child_id):
    """
    特定の子供情報を削除する関数。
    """
    with get_connection() as conn:
        conn.execute("""
            DELETE FROM users_child
            WHERE id = ?
        """, (child_id,))

# 初期化用関数
if __name__ == "__main__":
    create_users_table()
