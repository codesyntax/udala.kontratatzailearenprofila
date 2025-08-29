
# from udala.kontratatzailearenprofila import _
from Products.Five.browser import BrowserView
from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile
from zope.interface import implementer
from zope.publisher.interfaces import IPublishTraverse


@implementer(IPublishTraverse)
class ContractorsProfileIframeView(BrowserView):
    template_eu = ViewPageTemplateFile("contractors_profile_iframe_eu_view.pt")
    template_es = ViewPageTemplateFile("contractors_profile_iframe_es_view.pt")

    def __init__(self, context, request):
        super().__init__(context, request)
        self.params = []
        self.query = self.request.form.copy()

    def publishTraverse(self, request, name):
        # Consume any path segments after /iframe-view as parameters
        self.params.append(name)
        return self

    def language(self):
        return (self.params and self.params[0]) or "eu"

    def __call__(self):
        if self.language() == "es":
            return self.template_es(self.request)

        return self.template_eu(self.request)
