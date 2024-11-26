from flask import Blueprint
from .events import events_bp
from .illustrations import illustrations_bp
from .images import images_bp
from .users import users_bp
from .weather import weather_bp

# Blueprintをまとめて登録
def register_blueprints(app):
    """
    すべてのBlueprintをFlaskアプリケーションに登録する関数。
    
    :param app: Flaskアプリケーションインスタンス
    """
    app.register_blueprint(events_bp)
    app.register_blueprint(illustrations_bp)
    app.register_blueprint(images_bp)
    app.register_blueprint(users_bp)
    app.register_blueprint(weather_bp)
