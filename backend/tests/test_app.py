import unittest
from app import app

class AppTestCase(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.client = app.test_client()  # Flask テストクライアントを初期化

    def test_index(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"Flask top page!", response.data)

    def test_get_images(self):
        response = self.client.get("/api/images")
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn("images", data)
        self.assertIsInstance(data["images"], list)

    def test_get_illustrations(self):
        response = self.client.get("/api/illustrations")
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn("illustrations", data)
        self.assertIsInstance(data["illustrations"], list)

    def test_static_images(self):
        response = self.client.get("/static/images/sample.jpg")  # サンプル画像名を指定
        self.assertIn(response.status_code, [200, 404])  # ファイルがない場合は 404

    def test_static_illustrations(self):
        response = self.client.get("/static/illustrations/sample.jpg")  # サンプルイラスト名を指定
        self.assertIn(response.status_code, [200, 404])  # ファイルがない場合は 404

    def test_fetch_events(self):
        response = self.client.get("/api/events")
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn("events", data)
        self.assertIsInstance(data["events"], list)

    def test_weather_blueprint(self):
        response = self.client.get("/api/weather")  # weather Blueprint のエンドポイント
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn("weather", data)
        self.assertIsInstance(data["weather"], list)

if __name__ == "__main__":
    unittest.main()

#コマンドで tests フォルダ内のすべてのテストを実行できます
#python -m unittest discover tests


