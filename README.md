# web-ui-repo-template
This repository outlines what is the minimum required for a private CircleCI repository

## Next Steps
*NOTE: Any Questions please direct them to `#frontend-engineering`*

### Finish initial repo/project setup
- [ ] Go into CircleCI and follow the steps for `Set Up Project` through `Start Building` (The initial build will fail. Move on to below steps.)
- [ ] Configure the GitHub repo settings as [outlined in Confluence](https://circleci.atlassian.net/wiki/spaces/EN/pages/745210308/Create+an+Internal+Repo) and enable branch protection via Terraform
  - The initial configuration and permissions are set manually as outlined in that document, but we use Terraform to enforce branch protection settings in a somewhat-automated way.
  - After completing the initial manual configuration, you will need to open a PR on the `audit-terraform` repo to update the [Terraform file](https://github.com/circleci/audit-terraform/blob/master/github/repos/main.tf) with the appropriate new config to enforce branch protection for the `main` branch of the new repo.

### Set up config dependencies

#### Open setup tickets for other teams
- [ ] Open a [JIRA ticket](https://circleci.atlassian.net/jira/software/c/projects/INFRA/boards/264) to request Infrastructure Engineering:
  - Set up Docker Hub & ECR repositories for Docker image
  - Set up S3 bucket / CloudFront distribution for the app assets
  - Set up CircleCI context similar to [web-ui-user-settings-assets](https://app.circleci.com/settings/organization/github/circleci/contexts/6f8b9c1c-7c5d-431a-921c-625fd338e29b?return-to=%2F) with AWS credentials to deploy to S3
- [ ] Open a [CircleCI ServiceDesk ticket](https://circleci.atlassian.net/servicedesk/customer/portal/1/group/1/create/1) to request SecOps:
  - Configure Rennovate for the new repository
  - Set up Rollbar project
    - Set "Timezone" to `UTC` and "Time Format" to `24h clock`
    - Use "Don't send email notifications"
    - In the project settings page, add `Everyone` under _Teams with Access_
    - Configure the source control integration for GitHub ("Default Branch" should be `main` and "Project Root" should be `/src`)
    - Configure Slack notifications to post to the team's alerts channel

#### Configure third-party tools
- [ ] Set up Chromatic project
  - Log in to Chromatic, then click "Add project"
  - Follow the [instructions to set up the project](https://www.chromatic.com/docs/setup#install) and publish the initial version via CLI
- [ ] Add a new configuration for the [CircleCI Slack app](https://circleci.slack.com/apps/A0F7VRE7N-circleci?tab=more_info) if one doesn't already exist for your team's alerts channel

### Update config with values from dependency setup tasks

#### Configure CircleCI project
- [ ] Update CircleCI `Project Settings - Environment Variables` with the following envvars:
  - `EXCEPTION_LOGGER_CLIENT_TOKEN` with the `post_client_item` token for the Rollbar project
  - `EXCEPTION_LOGGER_SERVER_TOKEN` with the `post_server_item` token for the Rollbar project
  - `ROLLBAR_ACCESS_TOKEN` with the `post_server_item` token for the Rollbar project
  - `SLACK_WEBHOOK` with the webhook URL for the appropriate configuration of the [CircleCI Slack app](https://circleci.slack.com/apps/A0F7VRE7N-circleci?tab=more_info)
  - `CHROMATIC_APP_CODE` with the value from the Chromatic project

#### Update source code
- [ ] Update `.circleci/config.yml` - Replace all `#TODO - provide this` comments with values from the above work
- [ ] Update `k8s-values.yml` - Replace all `#TODO:` comments
- [ ] Update `package.json` - Replace `web-ui-template` placeholder package name
- [ ] Update Node, dependency versions, and CVE resolution overrides as needed to ensure CI passes
  - The `resolutions` and `resolutions:comments` fields in `package.json` are used to bump nested dependencies to fix CVEs. Reference other MFE codebases to copy the latest changes for those fields and bump other module versions as needed, then run `yarn install` to update the lockfile.
  - For most of our MFEs, the Node version is stored in three places: `.nvmrc`, the initial `FROM` line in `Dockerfile`, and the `engines` field in `package.json`. Reference other MFEs to update `Dockerfile` as needed, then update or add the values in `.nvmrc` and `package.json` to match.

### Prepare for initial deployment
- [ ] Follow the [Managing secrets](https://circleci.atlassian.net/wiki/spaces/EN/pages/570131080/Kubernetes+usage#Managing-secrets) section in our Kubernetes usage docs to create a Kubernetes secret for the service:
  - Name the secret the same as your MFE's Helm chart (e.g., `web-ui-replace-me-v1`)
  - Add a key for `exception-logger-server-token` with value set to the `post_server_item` token for the Rollbar project
- [ ] Create a [dashboard in Datadog](https://app.datadoghq.com/dashboard/lists) for the new MFE
  - Use the Timeboard layout and name the dashboard the same as the new repo
  - Add groups and widgets to match those of other MFEs as a starting point
    - The easiest way to get started is to copy the JSON config of widgets on other dashboards then customize them for your MFE.
    - If you copy the JSON config from another widget, be sure not to accidentially click "Save" on the existing widget in the dashboard you're copying from, which could unintentionally change another team's widget.

### Set up additional boilerplate
- [ ] Configure Cypress token (authenticated MFEs only)
  - If you are building a MFE that serves authenticated users, you will need to work with SecOps to set up a bot user in GitHub/CircleCI with the appropriate restricted permissions. The exact permissions will vary depending on your use case, but generally it should probably be created as a member of our test org in GitHub and then invited as a read-only external collaborator to the repos in the main `circleci` org that it needs access to for test cases.
  - Once this user is set up, create a new CircleCI access token and add it as a new project-level environment variable called `CYPRESS_CIRCLE_TOKEN` in the CircleCI project config for this repo.
- [ ] Add GraphQL shim
- [ ] Add "me" context from `web-ui-data`
- [ ] Configure Optimizely, Datadog RUM, etc.

### Clean up README
- [ ] Modify this README to look like the other web-ui-* repositories' README files:
  - Fix description below title
  - Replace the `<REPLACE-ME>` in the `Deployment` section to indicate the path to view this app
  - Update the line items in the `Operations` section (Please leave all items as this a requirement from Bear / Infrastructure team.)
  - Delete this `Next Steps` section when done

## Getting started

### Install dependencies:

```sh
$ yarn install
```

### Run the UI:

```sh
$ yarn start
```

Navigate to http://localhost:3000

### Authenticating in Development

To make requests to this app in development mode, you will need to set a
`CIRCLE_TOKEN` in your browser's local storage, even to view public project job
pages. Without this setup, you'll run into CORS issues which may appear as
GraphQL errors on the page.

1. Create a Personal API Token on [CircleCI](https://circleci.com/account/api)
2. Add the token to your browsers local storage using `CIRCLE_TOKEN`. In the JS
   console, enter

```
  localStorage.setItem('CIRCLE_TOKEN', '<token>');
```

### Run Storybook:

```sh
$ yarn storybook
```

### Run tests:

To run them once,

```sh
$ yarn test
```

Or, for a more interactive experience,

```sh
$ yarn test --watch
```

## Deployment

This project is auto-deployed to <REPLACE-ME> any time there is a
merge into the `master` branch. This deployment is set by the `Dockerfile` for
building the application image and the `k8s-values.yml` for management.

Basic Authentication is currently enabled for the production deployment in order
to limit access to people within CircleCI. The credentials can be found as
environment variables in k8s-values.yml.

## Operations

- Owning Team:
  [Which Team?](https://circleci.slack.com/app_redirect?channel=which-team)
- [Runbook](https://github.com/circleci/engineering/blob/master/teams/activation/runbook.md)
- [PagerDuty Rotation](https://circle.pagerduty.com/schedules#REPLACE-ME)
- [Rollbar Dashboard](https://rollbar.com/circle/web-ui-REPLACe-ME/)
- [Services Health and Metrics](https://app.datadoghq.com/dashboard/REPLACE-ME)
