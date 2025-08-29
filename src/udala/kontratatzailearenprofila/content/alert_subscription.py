# from plone.app.textfield import RichText
# from plone.autoform import directives
from plone.app.multilingual.dx.interfaces import ILanguageIndependentField
from plone.dexterity.content import Item

# from plone.namedfile import field as namedfile
from plone.supermodel import model
from udala.kontratatzailearenprofila import _

# from plone.supermodel.directives import fieldset
# from z3c.form.browser.radio import RadioFieldWidget
from zope import schema
from zope.interface import alsoProvides
from zope.interface import implementer


class IAlertSubscription(model.Schema):
    """Marker interface and Dexterity Python Schema for AlertSubscription"""

    code = schema.TextLine(
        title=_(
            "Code for this administration",
        ),
        description=_(
            "You need to ask this code to the Basque Government",
        ),
        default="6",
        required=True,
        readonly=False,
    )

    custom_css = schema.Text(
        title=_(
            "Custom CSS",
        ),
        description=_(
            "This CSS fill be loaded in the widget. You can use the following "
            "CSS variables to style the widget: --subscription-button-color, "
            "--subscription-button-hover-color, --subscription-font-family, "
            "--subscription-body-color, --subscription-legend-background-color "
            "You can also add any other CSS rules you want",
        ),
        default="",
        required=False,
        readonly=False,
    )


alsoProvides(IAlertSubscription["custom_css"], ILanguageIndependentField)


@implementer(IAlertSubscription)
class AlertSubscription(Item):
    """Content-type class for IAlertSubscription"""
