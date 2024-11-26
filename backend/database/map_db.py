from database.connection import get_connection

def create_map_table():
    """
    map テーブルを作成する関数。
    """
    with get_connection() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS map (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                location_name TEXT NOT NULL,
                latitude REAL NOT NULL,
                longitude REAL NOT NULL,
                description TEXT,
                added_by INTEGER,
                added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (added_by) REFERENCES users(id)
            )
        """)
    # location_name: 地点名。
    # latitude: 緯度。
    # longitude: 経度。
    # description: 地点の説明文（任意）。
    # added_by: エントリを追加したユーザーのID。
    # added_at: エントリが追加された日時。


def add_map_entry(location_name, latitude, longitude, description, added_by):
    """
    地図のエントリを追加する関数。
    """
    with get_connection() as conn:
        conn.execute("""
            INSERT INTO map (location_name, latitude, longitude, description, added_by)
            VALUES (?, ?, ?, ?, ?)
        """, (location_name, latitude, longitude, description, added_by))

def get_map_entry_by_id(map_id):
    """
    ID を指定して地図のエントリを取得する関数。
    """
    with get_connection() as conn:
        return conn.execute("""
            SELECT * FROM map
            WHERE id = ?
        """, (map_id,)).fetchone()

def get_all_map_entries():
    """
    すべての地図エントリを取得する関数。
    """
    with get_connection() as conn:
        return conn.execute("""
            SELECT * FROM map
        """).fetchall()

def update_map_entry(map_id, location_name=None, latitude=None, longitude=None, description=None):
    """
    地図エントリの情報を更新する関数。
    """
    with get_connection() as conn:
        fields = []
        values = []

        if location_name is not None:
            fields.append("location_name = ?")
            values.append(location_name)
        if latitude is not None:
            fields.append("latitude = ?")
            values.append(latitude)
        if longitude is not None:
            fields.append("longitude = ?")
            values.append(longitude)
        if description is not None:
            fields.append("description = ?")
            values.append(description)

        values.append(map_id)
        query = f"""
            UPDATE map
            SET {', '.join(fields)}
            WHERE id = ?
        """
        conn.execute(query, tuple(values))

def delete_map_entry(map_id):
    """
    地図エントリを削除する関数。
    """
    with get_connection() as conn:
        conn.execute("""
            DELETE FROM map
            WHERE id = ?
        """, (map_id,))

# 初期化用関数
if __name__ == "__main__":
    create_map_table()
