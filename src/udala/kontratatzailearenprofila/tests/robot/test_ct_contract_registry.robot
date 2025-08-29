# ============================================================================
# DEXTERITY ROBOT TESTS
# ============================================================================
#
# Run this robot test stand-alone:
#
#  $ bin/test -s udala.kontratatzailearenprofila -t test_contract_registry.robot --all
#
# Run this robot test with robot server (which is faster):
#
# 1) Start robot server:
#
# $ bin/robot-server --reload-path src udala.kontratatzailearenprofila.testing.UDALA_KONTRATATZAILEARENPROFILA_ACCEPTANCE_TESTING
#
# 2) Run robot tests:
#
# $ bin/robot /src/udala/kontratatzailearenprofila/tests/robot/test_contract_registry.robot
#
# See the http://docs.plone.org for further details (search for robot
# framework).
#
# ============================================================================

*** Settings *****************************************************************

Resource  plone/app/robotframework/selenium.robot
Resource  plone/app/robotframework/keywords.robot

Library  Remote  ${PLONE_URL}/RobotRemote

Test Setup  Open test browser
Test Teardown  Close all browsers


*** Test Cases ***************************************************************

Scenario: As a site administrator I can add a ContractRegistry
  Given a logged-in site administrator
    and an add ContractRegistry form
   When I type 'My ContractRegistry' into the title field
    and I submit the form
   Then a ContractRegistry with the title 'My ContractRegistry' has been created

Scenario: As a site administrator I can view a ContractRegistry
  Given a logged-in site administrator
    and a ContractRegistry 'My ContractRegistry'
   When I go to the ContractRegistry view
   Then I can see the ContractRegistry title 'My ContractRegistry'


*** Keywords *****************************************************************

# --- Given ------------------------------------------------------------------

a logged-in site administrator
  Enable autologin as  Site Administrator

an add ContractRegistry form
  Go To  ${PLONE_URL}/++add++ContractRegistry

a ContractRegistry 'My ContractRegistry'
  Create content  type=ContractRegistry  id=my-contract_registry  title=My ContractRegistry

# --- WHEN -------------------------------------------------------------------

I type '${title}' into the title field
  Input Text  name=form.widgets.IBasic.title  ${title}

I submit the form
  Click Button  Save

I go to the ContractRegistry view
  Go To  ${PLONE_URL}/my-contract_registry
  Wait until page contains  Site Map


# --- THEN -------------------------------------------------------------------

a ContractRegistry with the title '${title}' has been created
  Wait until page contains  Site Map
  Page should contain  ${title}
  Page should contain  Item created

I can see the ContractRegistry title '${title}'
  Wait until page contains  Site Map
  Page should contain  ${title}
