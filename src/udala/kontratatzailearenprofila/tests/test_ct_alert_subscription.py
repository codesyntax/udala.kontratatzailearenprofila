from udala.kontratatzailearenprofila.content.alert_subscription import (
    IAlertSubscription,
)
from udala.kontratatzailearenprofila.testing import (
    UDALA_KONTRATATZAILEARENPROFILA_INTEGRATION_TESTING,
)
from plone import api
from plone.app.testing import setRoles
from plone.app.testing import TEST_USER_ID
from plone.dexterity.interfaces import IDexterityFTI
from zope.component import createObject
from zope.component import queryUtility

import unittest


class AlertSubscriptionIntegrationTest(unittest.TestCase):
    layer = UDALA_KONTRATATZAILEARENPROFILA_INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer["portal"]
        setRoles(self.portal, TEST_USER_ID, ["Manager"])
        self.parent = self.portal

    def test_ct_alert_subscription_schema(self):
        fti = queryUtility(IDexterityFTI, name="AlertSubscription")
        schema = fti.lookupSchema()
        self.assertEqual(IAlertSubscription, schema)

    def test_ct_alert_subscription_fti(self):
        fti = queryUtility(IDexterityFTI, name="AlertSubscription")
        self.assertTrue(fti)

    def test_ct_alert_subscription_factory(self):
        fti = queryUtility(IDexterityFTI, name="AlertSubscription")
        factory = fti.factory
        obj = createObject(factory)

        self.assertTrue(
            IAlertSubscription.providedBy(obj),
            f"IAlertSubscription not provided by {obj}!",
        )

    def test_ct_alert_subscription_adding(self):
        setRoles(self.portal, TEST_USER_ID, ["Contributor"])
        obj = api.content.create(
            container=self.portal,
            type="AlertSubscription",
            id="alert_subscription",
        )

        self.assertTrue(
            IAlertSubscription.providedBy(obj),
            f"IAlertSubscription not provided by {obj.id}!",
        )

        parent = obj.__parent__
        self.assertIn("alert_subscription", parent.objectIds())

        # check that deleting the object works too
        api.content.delete(obj=obj)
        self.assertNotIn("alert_subscription", parent.objectIds())

    def test_ct_alert_subscription_globally_addable(self):
        setRoles(self.portal, TEST_USER_ID, ["Contributor"])
        fti = queryUtility(IDexterityFTI, name="AlertSubscription")
        self.assertTrue(fti.global_allow, f"{fti.id} is not globally addable!")
