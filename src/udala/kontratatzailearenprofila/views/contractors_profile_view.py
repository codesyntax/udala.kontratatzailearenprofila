# -*- coding: utf-8 -*-

# from udala.kontratatzailearenprofila import _
from Products.Five.browser import BrowserView
from zope.interface import implementer
from zope.interface import Interface

# from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile

class IContractorsProfileView(Interface):
    """ Marker Interface for IContractorsProfileView"""


@implementer(IContractorsProfileView)
class ContractorsProfileView(BrowserView):
    # If you want to define a template here, please remove the template from
    # the configure.zcml registration of this view.
    # template = ViewPageTemplateFile('contractors_profile_view.pt')

    def __call__(self):
        # Implement your own actions:
        return self.index()
