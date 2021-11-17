// From Tim's comment in the original PR:
//
// Why two files?
//
// I cannot for the life of me get babel-plugin-register-hook to work inside of jest
// I cannot for the life of me get any custom shim of require.context to work in storybook due to Critical warnings in webpack.
// I decided that instead of beating my head against a wall for another day, it might make sense to just have a custom config for jest that we use. This makes it work in both jest and storybook, a feat that I have yet to accomplish without this approach.
//
// https://github.com/circleci/web-ui/pull/554#discussion_r277696440

import { configure } from '@storybook/react';

import requireCont from '../.jest/register-context';
import '~/globalStyles';

function requireAll(requireContext: any) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  requireAll(requireCont('../src', true, /.story\.tsx$/));
}

configure(loadStories, module);
