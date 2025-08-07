const { Class } = require('../neon.js');
const {
  NodeSupport,
  CustomEventSupport,
  BubblingSupport,
} = require('../stdlib/index.js');

describe('stdlib', () => {
  describe('NodeSupport', () => {
    const TreeNode = Class('TreeNode').includes(NodeSupport)({
      prototype: {
        init: function (name) {
          this.name = name;
        },
      },
    });

    it('should correctly manage parent-child relationships', () => {
      const root = new TreeNode('root');
      const left = new TreeNode('left');
      const right = new TreeNode('right');

      root.appendChild(left);
      root.appendChild(right);

      expect(root.children).toContain(left);
      expect(root.children).toContain(right);
      expect(left.parent).toBe(root);
      expect(right.parent).toBe(root);
    });
  });

  describe('CustomEventSupport', () => {
    const EventfulClass = Class('EventfulClass').includes(CustomEventSupport)({});

    it('should correctly bind and dispatch events', () => {
      const sender = new EventfulClass();
      const mockCallback = jest.fn();

      sender.bind('alert', mockCallback);
      sender.dispatch('alert', { message: 'TEST' });

      expect(mockCallback).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'TEST',
        })
      );
    });
  });

  describe('BubblingSupport', () => {
    const BubblingTreeNode = Class('BubblingTreeNode').includes(
      NodeSupport,
      CustomEventSupport,
      BubblingSupport
    )({
      prototype: {
        init: function (name) {
          this.name = name;
        },
      },
    });

    it('should bubble events up the node tree', () => {
      const root = new BubblingTreeNode('root');
      const son = new BubblingTreeNode('son');
      const grandson = new BubblingTreeNode('grandson');

      root.appendChild(son);
      son.appendChild(grandson);

      const rootCallback = jest.fn();
      const sonCallback = jest.fn();
      const grandsonCallback = jest.fn();

      root.bind('alert', rootCallback);
      son.bind('alert', sonCallback);
      grandson.bind('alert', grandsonCallback);

      grandson.dispatch('alert');

      expect(grandsonCallback).toHaveBeenCalled();
      expect(sonCallback).toHaveBeenCalled();
      expect(rootCallback).toHaveBeenCalled();
    });

    it('should not bubble events down the node tree', () => {
      const root = new BubblingTreeNode('root');
      const son = new BubblingTreeNode('son');
      const grandson = new BubblingTreeNode('grandson');

      root.appendChild(son);
      son.appendChild(grandson);

      const rootCallback = jest.fn();
      const sonCallback = jest.fn();
      const grandsonCallback = jest.fn();

      root.bind('alert', rootCallback);
      son.bind('alert', sonCallback);
      grandson.bind('alert', grandsonCallback);

      root.dispatch('alert');

      expect(rootCallback).toHaveBeenCalled();
      expect(sonCallback).not.toHaveBeenCalled();
      expect(grandsonCallback).not.toHaveBeenCalled();
    });
  });
});
