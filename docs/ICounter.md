# ICounter

*Solidity Template Authors*

> ICounter

Increase or decrease a counter.

*This is where additional information goes.*

## Methods

### decrementCount

```solidity
function decrementCount() external nonpayable
```

Decrease the counter by 1.




### getCount

```solidity
function getCount() external view returns (int256 count)
```

Get the current counter value.




#### Returns

| Name | Type | Description |
|---|---|---|
| count | int256 | The current counter value. |

### incrementCount

```solidity
function incrementCount() external nonpayable
```

Increase the counter by 1.




### setCount

```solidity
function setCount(int256 count) external nonpayable
```

Sets the current counter value.



#### Parameters

| Name | Type | Description |
|---|---|---|
| count | int256 | The new counter value. |




