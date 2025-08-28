from pytest_plone import fixtures_factory
from udala.kontratatzailearenprofila.testing import ACCEPTANCE_TESTING
from udala.kontratatzailearenprofila.testing import FUNCTIONAL_TESTING
from udala.kontratatzailearenprofila.testing import INTEGRATION_TESTING


pytest_plugins = ["pytest_plone"]


globals().update(
    fixtures_factory((
        (ACCEPTANCE_TESTING, "acceptance"),
        (FUNCTIONAL_TESTING, "functional"),
        (INTEGRATION_TESTING, "integration"),
    ))
)
