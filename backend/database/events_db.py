from .connection import get_connection

def create_event(event_name, event_place, event_date, image_id, business_operator_id):
    with get_connection() as conn:
        conn.execute("""
            INSERT INTO events (event_name, event_place, event_date, image_id, business_operator_id)
            VALUES (?, ?, ?, ?, ?)
        """, (event_name, event_place, event_date, image_id, business_operator_id))

def get_events():
    with get_connection() as conn:
        return [dict(row) for row in conn.execute("SELECT * FROM events")]
