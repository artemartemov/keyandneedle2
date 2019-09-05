module.exports = {
  transform: {
    '^.+\\.js?$': '<rootDir>/tests/jest-preprocess.js',
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/file-mock.js',
    '^utils$': '<rootDir>/src/utils/index.js',
    '^components$': '<rootDir>/src/components/index.js',
  },
  testPathIgnorePatterns: ['node_modules', '.cache'],
  transformIgnorePatterns: ['node_modules/(?!(gatsby|react-feather)/)'],
  globals: {
    __PATH_PREFIX__: '',
  },
  testURL: 'http://localhost',
  setupFiles: ['<rootDir>/tests/loadershim.js'],
  collectCoverage: true,
};
