from udala.kontratatzailearenprofila.content.contract_registry import IContractRegistry
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


class ContractRegistryIntegrationTest(unittest.TestCase):
    layer = UDALA_KONTRATATZAILEARENPROFILA_INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer["portal"]
        setRoles(self.portal, TEST_USER_ID, ["Manager"])
        self.parent = self.portal

    def test_ct_contract_registry_schema(self):
        fti = queryUtility(IDexterityFTI, name="ContractRegistry")
        schema = fti.lookupSchema()
        self.assertEqual(IContractRegistry, schema)

    def test_ct_contract_registry_fti(self):
        fti = queryUtility(IDexterityFTI, name="ContractRegistry")
        self.assertTrue(fti)

    def test_ct_contract_registry_factory(self):
        fti = queryUtility(IDexterityFTI, name="ContractRegistry")
        factory = fti.factory
        obj = createObject(factory)

        self.assertTrue(
            IContractRegistry.providedBy(obj),
            f"IContractRegistry not provided by {obj}!",
        )

    def test_ct_contract_registry_adding(self):
        setRoles(self.portal, TEST_USER_ID, ["Contributor"])
        obj = api.content.create(
            container=self.portal,
            type="ContractRegistry",
            id="contract_registry",
        )

        self.assertTrue(
            IContractRegistry.providedBy(obj),
            f"IContractRegistry not provided by {obj.id}!",
        )

        parent = obj.__parent__
        self.assertIn("contract_registry", parent.objectIds())

        # check that deleting the object works too
        api.content.delete(obj=obj)
        self.assertNotIn("contract_registry", parent.objectIds())

    def test_ct_contract_registry_globally_addable(self):
        setRoles(self.portal, TEST_USER_ID, ["Contributor"])
        fti = queryUtility(IDexterityFTI, name="ContractRegistry")
        self.assertTrue(fti.global_allow, f"{fti.id} is not globally addable!")
