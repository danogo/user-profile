import React from 'react';
import { shallow } from 'enzyme';
import UserProfile from './UserProfile';

describe('UserProfile', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<UserProfile/>);
  });

  test('component renders correctly', () => {
    expect(shallow(<UserProfile/>)).toMatchSnapshot();
  });

  test('renders div container', () => {
    const divs = wrapper.find('div');
    expect(divs.length).toBeGreaterThan(0);
  })

  test('contains all children components', () => {
    const div = wrapper.find('div').first();
    // Enzyme omits the outermost node when using the .children() so we can compare its children against first div's children, which should be the same
    expect(div.children()).toEqual(wrapper.children());
    expect(wrapper.children().length).toBe(3);
  })

  test('doesn\'t receive any props', () => {
    expect(wrapper.instance().props).toEqual({});
  })

  test('profile isn\'t followed or liked by default', () => {
    expect(wrapper.state().isFollowed).toBe(false);
    expect(wrapper.state().isLiked).toBe(false);
  })
});