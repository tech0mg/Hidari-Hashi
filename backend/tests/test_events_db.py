import unittest
from database.events_db import create_event, get_events
from database.connection import get_connection

class TestEventsDB(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        # テスト用データベースのセットアップ
        with get_connection() as conn:
            conn.execute("DROP TABLE IF EXISTS events")
            conn.execute("""
                CREATE TABLE events (
                    event_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    event_name TEXT NOT NULL,
                    event_place TEXT NOT NULL,
                    event_date TEXT NOT NULL,
                    event_detail TEXT,
                    image_id INTEGER,
                    business_operator_id INTEGER
                )
            """)

    def test_create_event(self):
        # イベントを挿入
        create_event(
            event_name="Test Event",
            event_place="Test Place",
            event_date="2024-01-01",
            event_detail="This is a test event.",
            image_id=1,
            business_operator_id=1
        )

        # データベースに正しく保存されているか確認
        with get_connection() as conn:
            result = conn.execute("SELECT * FROM events WHERE event_name = ?", ("Test Event",)).fetchone()
            self.assertIsNotNone(result)
            self.assertEqual(result["event_name"], "Test Event")
            self.assertEqual(result["event_place"], "Test Place")
            self.assertEqual(result["event_date"], "2024-01-01")
            self.assertEqual(result["event_detail"], "This is a test event.")
            self.assertEqual(result["image_id"], 1)
            self.assertEqual(result["business_operator_id"], 1)

    def test_get_events(self):
        # すでにデータが存在することを確認
        events = get_events()
        self.assertIsInstance(events, list)
        self.assertGreaterEqual(len(events), 1)  # 少なくとも1件のイベントが存在する
        self.assertEqual(events[0]["event_name"], "Test Event")
        self.assertEqual(events[0]["event_place"], "Test Place")

if __name__ == "__main__":
    unittest.main()

#テスト実行: 以下のコマンドでテストを実行します。
#python -m unittest discover tests
