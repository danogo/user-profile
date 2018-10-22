import React from 'react';
import { shallow } from 'enzyme';
import Comments from './Comments';

describe('Comments', () => {
  let wrapper;
  let mockProps;

  beforeEach(() => {
    mockProps = {
      onInput: jest.fn(),
      onToggleComments: jest.fn(),
      comments: [
        {
          "username": "Mike Ross",
          "date": "1539088547946",
          "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto autem nam quae delectus maxime inventore odio libero provident obcaecati a."
        },
        {
          "username": "Bob Ross",
          "date": "1529588547946",
          "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto autem nam quae delectus maxime inventore odio libero provident obcaecati a."
        },
      ],
      showComments: true
    }
    wrapper = shallow(<Comments {...mockProps}/>);
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
    expect(wrapper.find('#inputComment').props().onKeyPress).toBe(mockProps.onInput);
    expect(wrapper.find('.btnComments').props().onClick).toBe(mockProps.onToggleComments);
  });

  test('displays comments by default', () => {
    expect(wrapper.props().className).toBe('Comments');
    expect(wrapper.find('#comList').children().length).toBe(mockProps.comments.length)
  });

  test('comments are sorted properly', () => {
    const sortedComments = mockProps.comments.sort((elA, elB) => {
      return parseInt(elA.date, 10) - parseInt(elB.date, 10);
    });
    // console.log(wrapper.find('#comList').childAt(0).find('.name').props())
    // console.log(sortedComments)
    expect(wrapper.find('#comList').childAt(0).find('.name').text()).toBe(sortedComments[0].username);
  });

  test('callback is called when user clicks button to hide comments', () => {
    const btnComments = wrapper.find('.btnComments');
    btnComments.prop('onClick')();
    expect(mockProps.onToggleComments).toHaveBeenCalledTimes(1);
  });

  describe('showComments prop is false', () => {
    beforeEach(() => {
      mockProps.showComments = false;
      wrapper = shallow(<Comments {...mockProps}/>);
    });
    test('comments are not visible', () => {
      expect(wrapper.props().className).toBe('CommentsHidden Comments');
    });
    test('button has "Show comments(numOfComments)" text  when hidden', () => {
      const btnToggleComments = wrapper.find('.btnComments');
      expect(btnToggleComments.text()).toEqual(`Show comments(${mockProps.comments.length})`);
    });
  });
});