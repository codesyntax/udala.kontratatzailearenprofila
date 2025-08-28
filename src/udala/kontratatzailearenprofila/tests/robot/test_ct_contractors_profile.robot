# ============================================================================
# DEXTERITY ROBOT TESTS
# ============================================================================
#
# Run this robot test stand-alone:
#
#  $ bin/test -s udala.kontratatzailearenprofila -t test_contractors_profile.robot --all
#
# Run this robot test with robot server (which is faster):
#
# 1) Start robot server:
#
# $ bin/robot-server --reload-path src udala.kontratatzailearenprofila.testing.UDALA_KONTRATATZAILEARENPROFILA_ACCEPTANCE_TESTING
#
# 2) Run robot tests:
#
# $ bin/robot /src/udala/kontratatzailearenprofila/tests/robot/test_contractors_profile.robot
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

Scenario: As a site administrator I can add a ContractorsProfile
  Given a logged-in site administrator
    and an add ContractorsProfile form
   When I type 'My ContractorsProfile' into the title field
    and I submit the form
   Then a ContractorsProfile with the title 'My ContractorsProfile' has been created

Scenario: As a site administrator I can view a ContractorsProfile
  Given a logged-in site administrator
    and a ContractorsProfile 'My ContractorsProfile'
   When I go to the ContractorsProfile view
   Then I can see the ContractorsProfile title 'My ContractorsProfile'


*** Keywords *****************************************************************

# --- Given ------------------------------------------------------------------

a logged-in site administrator
  Enable autologin as  Site Administrator

an add ContractorsProfile form
  Go To  ${PLONE_URL}/++add++ContractorsProfile

a ContractorsProfile 'My ContractorsProfile'
  Create content  type=ContractorsProfile  id=my-contractors_profile  title=My ContractorsProfile

# --- WHEN -------------------------------------------------------------------

I type '${title}' into the title field
  Input Text  name=form.widgets.IBasic.title  ${title}

I submit the form
  Click Button  Save

I go to the ContractorsProfile view
  Go To  ${PLONE_URL}/my-contractors_profile
  Wait until page contains  Site Map


# --- THEN -------------------------------------------------------------------

a ContractorsProfile with the title '${title}' has been created
  Wait until page contains  Site Map
  Page should contain  ${title}
  Page should contain  Item created

I can see the ContractorsProfile title '${title}'
  Wait until page contains  Site Map
  Page should contain  ${title}
