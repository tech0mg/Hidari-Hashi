from database.connection import get_connection

def create_schedule_table():
    """
    schedule テーブルを作成する関数。
    """
    with get_connection() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS schedule (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                schedule_name TEXT NOT NULL,
                schedule_time TEXT NOT NULL,
                schedule_number INTEGER NOT NULL,
                description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

    # schedule_name: スケジュールの名前。
    # schedule_time: スケジュールの時間（文字列形式）。
    # schedule_number: スケジュールの順番を表す番号。
    # description: スケジュールの説明文（任意）。
    # created_at: スケジュールが作成された日時。


def add_schedule(schedule_name, schedule_time, schedule_number, description=None):
    """
    スケジュールを追加する関数。名前、時間、順番、および説明を格納
    """
    with get_connection() as conn:
        conn.execute("""
            INSERT INTO schedule (schedule_name, schedule_time, schedule_number, description)
            VALUES (?, ?, ?, ?)
        """, (schedule_name, schedule_time, schedule_number, description))

def get_schedule_by_id(schedule_id):
    """
    ID を指定してスケジュールを取得する関数。
    """
    with get_connection() as conn:
        return conn.execute("""
            SELECT * FROM schedule
            WHERE id = ?
        """, (schedule_id,)).fetchone()

def get_all_schedules():
    """
    すべてのスケジュールを取得する関数。schedule_number に基づいて昇順で返します
    """
    with get_connection() as conn:
        return conn.execute("""
            SELECT * FROM schedule
            ORDER BY schedule_number ASC
        """).fetchall()

def update_schedule(schedule_id, schedule_name=None, schedule_time=None, schedule_number=None, description=None):
    """
    スケジュールを更新する関数。更新したいフィールドのみ指定できます
    """
    with get_connection() as conn:
        fields = []
        values = []

        if schedule_name is not None:
            fields.append("schedule_name = ?")
            values.append(schedule_name)
        if schedule_time is not None:
            fields.append("schedule_time = ?")
            values.append(schedule_time)
        if schedule_number is not None:
            fields.append("schedule_number = ?")
            values.append(schedule_number)
        if description is not None:
            fields.append("description = ?")
            values.append(description)

        values.append(schedule_id)
        query = f"""
            UPDATE schedule
            SET {', '.join(fields)}
            WHERE id = ?
        """
        conn.execute(query, tuple(values))

def delete_schedule(schedule_id):
    """
    スケジュールを削除する関数。
    """
    with get_connection() as conn:
        conn.execute("""
            DELETE FROM schedule
            WHERE id = ?
        """, (schedule_id,))

# 初期化用関数
if __name__ == "__main__":
    create_schedule_table()
