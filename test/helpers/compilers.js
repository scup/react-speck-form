function noop() {
  return null;
}

require.extensions['.css'] = noop;
require.extensions['.less'] = noop;
