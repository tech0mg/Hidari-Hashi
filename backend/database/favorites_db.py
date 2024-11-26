from database.connection import get_connection

def create_favorites_table():
    """
    favorites テーブルを作成する関数。
    """
    with get_connection() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS favorites (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                child_id INTEGER NOT NULL,
                event_id INTEGER NOT NULL,
                favorited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (child_id) REFERENCES users_child(id),
                FOREIGN KEY (event_id) REFERENCES events(id)
            )
        """)

def add_favorite(child_id, event_id):
    """
    お気に入りを追加する関数。
    """
    with get_connection() as conn:
        conn.execute("""
            INSERT INTO favorites (child_id, event_id)
            VALUES (?, ?)
        """, (child_id, event_id))

def get_favorites_by_child(child_id):
    """
    特定の子どものお気に入りを取得する関数。
    """
    with get_connection() as conn:
        return conn.execute("""
            SELECT * FROM favorites
            WHERE child_id = ?
        """, (child_id,)).fetchall()

def delete_favorite(favorite_id):
    """
    お気に入りを削除する関数。
    """
    with get_connection() as conn:
        conn.execute("""
            DELETE FROM favorites
            WHERE id = ?
        """, (favorite_id,))

def get_favorite_events(child_id):
    """
    子どものお気に入りイベントを取得する関数。
    """
    with get_connection() as conn:
        return conn.execute("""
            SELECT e.* 
            FROM favorites f
            INNER JOIN events e ON f.event_id = e.id
            WHERE f.child_id = ?
        """, (child_id,)).fetchall()

# 初期化用関数
if __name__ == "__main__":
    create_favorites_table()
