# -*- coding: utf-8 -*-
# from plone.app.textfield import RichText
# from plone.autoform import directives
from plone.app.multilingual.dx.interfaces import ILanguageIndependentField
from plone.dexterity.content import Item
# from plone.namedfile import field as namedfile
from plone.supermodel import model
# from plone.supermodel.directives import fieldset
# from z3c.form.browser.radio import RadioFieldWidget
from zope import schema
from zope.interface import implementer


from udala.kontratatzailearenprofila import _
from zope.interface import alsoProvides


class IContractRegistry(model.Schema):
    """ Marker interface and Dexterity Python Schema for ContractRegistry
    """
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
            "CSS variables to style the widget: --contracts-primary-color, "
            "--contracts-font-family, --contracts-body-color, "
            "--contracts-tabs-background-color"
            "You can also add any other CSS rules you want",
        ),
        default="",
        required=False,
        readonly=False,
    )

alsoProvides(IContractRegistry["custom_css"], ILanguageIndependentField)
@implementer(IContractRegistry)
class ContractRegistry(Item):
    """ Content-type class for IContractRegistry
    """
