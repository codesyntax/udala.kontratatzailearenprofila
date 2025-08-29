
# from udala.kontratatzailearenprofila import _
from plone import api

# from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile
from Products.CMFPlone.utils import get_installer
from Products.Five.browser import BrowserView
from zope.interface import implementer
from zope.interface import Interface


class IContractRegistryView(Interface):
    """Marker Interface for IContractRegistryView"""


@implementer(IContractRegistryView)
class ContractRegistryView(BrowserView):
    # If you want to define a template here, please remove the template from
    # the configure.zcml registration of this view.
    # template = ViewPageTemplateFile('contractors_profile_view.pt')

    def __call__(self):
        # Implement your own actions:
        return self.index()

    def language(self):
        portal = api.portal.get()
        installer = get_installer(portal, self.request)
        if installer.is_product_installed("plone.app.multilingual"):
            return ""

        return api.portal.get_current_language()
