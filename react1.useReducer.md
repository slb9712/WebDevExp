useReducer 是 React 的一个内置 Hook，它允许你在组件内部使用类似 Redux 的状态管理模式。与 Redux 相比，useReducer 主要用于管理组件内部的局部状态，而不是全局状态。以下是 useReducer 和 Redux 之间的主要区别：

1. 适用范围：
Redux 用于管理整个应用的全局状态，它提供了一个单一的、集中的状态存储，使得跨组件的状态共享变得更容易。
useReducer 用于管理组件内部的局部状态。它适用于那些拥有复杂、多层次的状态逻辑的组件。
2. 设计和实现：
Redux 是一个独立的状态管理库，它需要与 React 配合使用（通过 react-redux 库）。Redux 的设计原则遵循单一数据源、只读状态和纯函数更新状态的概念。
useReducer 是 React 的内置 Hook，它遵循类似的设计原则，但实现更简单，仅适用于组件内部状态管理。
3. 使用方式：
在使用 Redux 时，需要创建 actions、reducers 和 store，以及使用 react-redux 提供的 Provider、useSelector 和 useDispatch 等组件和 Hooks。
在使用 useReducer 时，只需在组件内部定义 reducer 函数和初始状态，并调用 useReducer Hook。不需要额外的库或组件。
4. 性能和优化：
Redux 提供了一些性能优化特性，如中间件、状态选择器和批量更新等。这使得 Redux 更适合大型应用和复杂场景。
useReducer 更轻量级，适用于组件内部状态管理。在性能方面，它依赖于 React 的默认优化策略，如避免不必要的渲染等。
总之，useReducer 和 Redux 都遵循类似的设计原则，但它们适用于不同的场景。useReducer 主要用于组件内部的局部状态管理，而 Redux 用于全局状态管理。在选择使用哪种方法时，需要根据实际需求和应用的复杂度来决定。对于简单的应用，useReducer 可能就足够了；对于复杂的应用，使用 Redux 可能更合适

```ts
  const QueryState = {
    Offset: 0,
    Limit: 10,
    MachineType: antiExtortParams ? 'CVM' : 'ALL',
    MachineRegion: 'all-regions',
    Filters: showAll
      ? { ...filter }
      : { Version: selectableType ? [selectableType] : ['ProtectedMachines'], ...filter },
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_PAGE':
        return { ...state, ...action.payload };
      case 'SET_FILTER':
        return {
          ...state,
          Filters: { ...state.Filters, ...action.payload },
          Offset: 0,
        };
      case 'SET_AREA':
        delete (state?.Filters ?? {}).TagId;
        return {
          ...state,
          MachineType: action.payload,
          MachineRegion: 'all-regions',
          Offset: 0,
        };
      case 'SET_REGION':
        return { ...state, MachineRegion: action.payload, Offset: 0 };
      case 'REFRESH':
        return { ...state, ...QueryState };
      default:
        return state;
    }
  };

  const [query, dispatch] = useReducer(reducer, QueryState);

   dispatch({ type: 'SET_REGION', payload: value });
```