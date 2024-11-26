from database.connection import get_connection

def create_travel_guide_table():
    """
    travel_guide テーブルを作成する関数。
    """
    with get_connection() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS travel_guide (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                child_id INTEGER NOT NULL,
                event_id INTEGER NOT NULL,
                schedule_id INTEGER NOT NULL,
                comment TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (child_id) REFERENCES users_child (id) ON DELETE CASCADE,
                FOREIGN KEY (event_id) REFERENCES event (id) ON DELETE CASCADE,
                FOREIGN KEY (schedule_id) REFERENCES schedule (id) ON DELETE CASCADE
            )
        """)
    # child_id: 旅行ガイドが紐づけられる子供のID（users_child テーブルに外部キー制約）。
    # event_id: 関連するイベントのID（event テーブルに外部キー制約）。
    # schedule_id: 関連するスケジュールのID（schedule テーブルに外部キー制約）。
    # comment: 旅行ガイドに対するコメント。
    # created_at: 作成日時。


def add_travel_guide(child_id, event_id, schedule_id, comment=None):
    """
    旅行ガイド情報を追加する関数。
    """
    with get_connection() as conn:
        conn.execute("""
            INSERT INTO travel_guide (child_id, event_id, schedule_id, comment)
            VALUES (?, ?, ?, ?)
        """, (child_id, event_id, schedule_id, comment))

def get_travel_guide_by_id(travel_guide_id):
    """
    travel_guide ID を指定して情報を取得する関数。
    """
    with get_connection() as conn:
        return conn.execute("""
            SELECT * FROM travel_guide
            WHERE id = ?
        """, (travel_guide_id,)).fetchone()

def get_travel_guides_by_child_id(child_id):
    """
    child_id を指定して関連する旅行ガイド情報を取得する関数。
    """
    with get_connection() as conn:
        return conn.execute("""
            SELECT * FROM travel_guide
            WHERE child_id = ?
            ORDER BY created_at DESC
        """, (child_id,)).fetchall()

def update_travel_guide(travel_guide_id, event_id=None, schedule_id=None, comment=None):
    """
    旅行ガイド情報を更新する関数。
    """
    with get_connection() as conn:
        fields = []
        values = []

        if event_id is not None:
            fields.append("event_id = ?")
            values.append(event_id)
        if schedule_id is not None:
            fields.append("schedule_id = ?")
            values.append(schedule_id)
        if comment is not None:
            fields.append("comment = ?")
            values.append(comment)

        values.append(travel_guide_id)
        query = f"""
            UPDATE travel_guide
            SET {', '.join(fields)}
            WHERE id = ?
        """
        conn.execute(query, tuple(values))

def delete_travel_guide(travel_guide_id):
    """
    旅行ガイド情報を削除する関数。
    """
    with get_connection() as conn:
        conn.execute("""
            DELETE FROM travel_guide
            WHERE id = ?
        """, (travel_guide_id,))

# 初期化用関数
if __name__ == "__main__":
    create_travel_guide_table()
