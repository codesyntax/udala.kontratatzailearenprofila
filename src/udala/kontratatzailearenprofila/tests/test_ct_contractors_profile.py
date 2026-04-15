from plone import api
from plone.app.testing import setRoles
from plone.app.testing import TEST_USER_ID
from plone.dexterity.interfaces import IDexterityFTI
from udala.kontratatzailearenprofila.content.contractors_profile import (
    IContractorsProfile,
)
from udala.kontratatzailearenprofila.testing import (
    UDALA_KONTRATATZAILEARENPROFILA_INTEGRATION_TESTING,
)
from zope.component import createObject
from zope.component import queryUtility

import unittest


class ContractorsProfileIntegrationTest(unittest.TestCase):
    layer = UDALA_KONTRATATZAILEARENPROFILA_INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer["portal"]
        setRoles(self.portal, TEST_USER_ID, ["Manager"])
        self.parent = self.portal

    def test_ct_contractors_profile_schema(self):
        fti = queryUtility(IDexterityFTI, name="ContractorsProfile")
        schema = fti.lookupSchema()
        self.assertEqual(IContractorsProfile, schema)

    def test_ct_contractors_profile_fti(self):
        fti = queryUtility(IDexterityFTI, name="ContractorsProfile")
        self.assertTrue(fti)

    def test_ct_contractors_profile_factory(self):
        fti = queryUtility(IDexterityFTI, name="ContractorsProfile")
        factory = fti.factory
        obj = createObject(factory)

        self.assertTrue(
            IContractorsProfile.providedBy(obj),
            f"IContractorsProfile not provided by {obj}!",
        )

    def test_ct_contractors_profile_adding(self):
        setRoles(self.portal, TEST_USER_ID, ["Contributor"])
        obj = api.content.create(
            container=self.portal,
            type="ContractorsProfile",
            id="contractors_profile",
        )

        self.assertTrue(
            IContractorsProfile.providedBy(obj),
            f"IContractorsProfile not provided by {obj.id}!",
        )

        parent = obj.__parent__
        self.assertIn("contractors_profile", parent.objectIds())

        # check that deleting the object works too
        api.content.delete(obj=obj)
        self.assertNotIn("contractors_profile", parent.objectIds())

    def test_ct_contractors_profile_globally_addable(self):
        setRoles(self.portal, TEST_USER_ID, ["Contributor"])
        fti = queryUtility(IDexterityFTI, name="ContractorsProfile")
        self.assertTrue(fti.global_allow, f"{fti.id} is not globally addable!")
