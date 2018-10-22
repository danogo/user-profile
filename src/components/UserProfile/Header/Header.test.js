import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Header', () => {
  let wrapper;
  let mockProps;
  beforeEach(() => {
    mockProps = {
      onHeartClick: jest.fn(),
      onFollowClick: jest.fn(),
      onShareClick: jest.fn(),
      likes: 121,
      following: 723,
      followers: 4433,
      isLiked: false,
      isFollowed: false,
    }
    wrapper = shallow(<Header {...mockProps}/>);
  });

  test('component renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('renders div container', () => {
    const divs = wrapper.find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  test('contains all children components', () => {
    const div = wrapper.find('div').first();
    expect(div.children()).toEqual(wrapper.children());
    expect(wrapper.children().length).toBe(3);
  });

  test('receives all onClick handlers', () => {
    expect(wrapper.find('[id="btnShare"]').props().onClick).toBe(mockProps.onShareClick);
    expect(wrapper.find('[id="btnHeart"]').props().onClick).toBe(mockProps.onHeartClick);
    expect(wrapper.find('[id="btnFollow"]').props().onClick).toBe(mockProps.onFollowClick);
  });

  test('displays socials correctly', () => {
    expect(wrapper.find('.socialsNumber').length).toBe(3);
    expect(wrapper.find('.socialsNumber').at(0).text()).toBe(`${mockProps.likes}`);
    expect(wrapper.find('.socialsNumber').at(1).text()).toBe(`${mockProps.following}`);
    expect(wrapper.find('.socialsNumber').at(2).text()).toBe(`${mockProps.followers}`);
  });

  describe('when isLiked prop is false', () => {
    test('displays regular icon with white color', () => {
      expect(wrapper.find('.heartIcon').props().icon).toEqual(['far', 'heart']);
      expect(wrapper.find('.heartIcon').props().color).toEqual('#D9D9D9');
    });

  });

  describe('when isLiked prop is true', () => {
    beforeEach(() => {
      mockProps.isLiked = true;
      wrapper = shallow(<Header {...mockProps}/>);
    });
    test('display solid icon with orange color', () => {
      expect(wrapper.find('.heartIcon').props().icon).toEqual(['fas', 'heart']);
      expect(wrapper.find('.heartIcon').props().color).toEqual('#FFA640');
    });
  }); 

  describe('when isFollowed prop is false', () => {
    test('button has "FOLLOW" text and only btnFollow class', () => {
      // console.log(wrapper.find('#btnFollow').text())
      // console.log(wrapper.find('#btnFollow').props().className)
      expect(wrapper.find('#btnFollow').text()).toBe('FOLLOW');
      expect(wrapper.find('#btnFollow').props().className).toBe('btnFollow');
    });
  });
  
  describe('when isFollowed prop is true', () => {
    beforeEach(() => {
      mockProps.isFollowed = true;
      wrapper = shallow(<Header {...mockProps}/>);
    });
    test('button has "UNFOLLOW" text and 2 classes: btnFollow, btnUnfollow', () => {
      // console.log(wrapper.find('#btnUnfollow').text())
      // console.log(wrapper.find('#btnUnfollow').props().className)
      expect(wrapper.find('#btnUnfollow').text()).toBe('UNFOLLOW');
      expect(wrapper.find('#btnUnfollow').props().className).toBe('btnFollow btnUnfollow');
    });
  });

  test('callback is called when user clicks btnHeart', () => {
    const btnHeart = wrapper.find('#btnHeart');
    // btnHeart.simulate('click');
    btnHeart.prop('onClick')();
    expect(mockProps.onHeartClick).toHaveBeenCalledTimes(1);
  })

  test('callback is called when user clicks btnShare', () => {
    const btnShare = wrapper.find('#btnShare');
    // btnShare.simulate('click');
    btnShare.prop('onClick')();
    expect(mockProps.onShareClick).toHaveBeenCalledTimes(1);
  })

  test('callback is called when user clicks btnFollow', () => {
    const btnFollow = wrapper.find('#btnFollow');
    // btnFollow.simulate('click');
    btnFollow.prop('onClick')();
    expect(mockProps.onFollowClick).toHaveBeenCalledTimes(1);
  })
});

