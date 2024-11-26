from database.connection import get_connection

def create_images_table():
    """
    images テーブルを作成する関数。
    """
    with get_connection() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS images (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                image_name TEXT NOT NULL,
                image_type TEXT,
                image_content BLOB NOT NULL,
                image_size INTEGER,
                uploaded_by INTEGER,
                uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (uploaded_by) REFERENCES users(id)
            )
        """)
    # image_name: 画像の名前。
    # image_type: ファイルタイプ (例: JPEG, PNG)。
    # image_content: 画像データをBLOB形式で格納。
    # image_size: ファイルサイズ（バイト数）。
    # uploaded_by: アップロードしたユーザーのID。
    # uploaded_at: 画像がアップロードされた日時。


def add_image(image_name, image_type, image_content, image_size, uploaded_by):
    """
    画像を追加する関数。
    """
    with get_connection() as conn:
        conn.execute("""
            INSERT INTO images (image_name, image_type, image_content, image_size, uploaded_by)
            VALUES (?, ?, ?, ?, ?)
        """, (image_name, image_type, image_content, image_size, uploaded_by))
#画像データをテーブルに追加します。image_content はバイナリデータ（BLOB）として格納されます。



def get_image_by_id(image_id):
    """
    ID を指定して画像を取得する関数。
    """
    with get_connection() as conn:
        return conn.execute("""
            SELECT * FROM images
            WHERE id = ?
        """, (image_id,)).fetchone()
#画像のIDを指定して、該当する画像情報を取得します。


def get_all_images():
    """
    すべての画像を取得する関数。
    """
    with get_connection() as conn:
        return conn.execute("""
            SELECT * FROM images
        """).fetchall()

def update_image(image_id, image_name=None, image_type=None, image_content=None, image_size=None):
    """
    画像の情報を更新する関数。可変的に更新したいフィールドのみ指定できます。
    """
    with get_connection() as conn:
        fields = []
        values = []

        if image_name is not None:
            fields.append("image_name = ?")
            values.append(image_name)
        if image_type is not None:
            fields.append("image_type = ?")
            values.append(image_type)
        if image_content is not None:
            fields.append("image_content = ?")
            values.append(image_content)
        if image_size is not None:
            fields.append("image_size = ?")
            values.append(image_size)

        values.append(image_id)
        query = f"""
            UPDATE images
            SET {', '.join(fields)}
            WHERE id = ?
        """
        conn.execute(query, tuple(values))

def delete_image(image_id):
    """
    画像のIDを指定して削除する関数。
    """
    with get_connection() as conn:
        conn.execute("""
            DELETE FROM images
            WHERE id = ?
        """, (image_id,))

# 初期化用関数
if __name__ == "__main__":
    create_images_table()
#スクリプトを直接実行した際に images テーブルを作成します