import secrets
import os
from PIL import Image
from genes_flask import mail
from flask import url_for, current_app
from flask_mail import Message


def safe_picture(picture):
    random_hex = secrets.token_hex(8)
    _, f_ext = os.path.splitext(picture.filename)
    picture_file_name = random_hex + f_ext
    picture_path = os.path.join(current_app.root_path, 'static/profile_img', picture_file_name)
    
    output_size = 125, 125
    img = Image.open(picture)
    img.thumbnail(output_size)
    img.save(picture_path)
    
    return picture_file_name


def send_reset_email(user):
    token = user.get_reset_token()
    msg = Message('Password reset Request', sender='321mig123@gmail.com', recipients=[user.email])
    msg.body = f"""To reset you'r password visit link: {url_for('users.reset_token', token=token, _external=True)}
    If you didn't make this request ignore this message"""
    mail.send(msg)

    