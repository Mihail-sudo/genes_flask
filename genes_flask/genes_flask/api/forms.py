from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError


class ProteinsForm(FlaskForm):
    proteins = StringField('Genes', validators=[DataRequired()])
    
    def validate_proteins(self, proteins):
        if not proteins.data.replace(', ', '').isalnum():
            raise ValidationError('That username is taken')
    