from Products.Five.browser import BrowserView


class ContractRegistryCustomCSSView(BrowserView):
    def __call__(self):
        self.request.RESPONSE.setHeader("Content-Type", "text/css")
        return self.context.custom_css
