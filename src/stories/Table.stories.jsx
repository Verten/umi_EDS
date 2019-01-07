import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import Theme from '../components/theme'
import Table from '../components/table'
import Button from '../components/button'

const mockColumns = [
  { key: 1, dataIndex: 'name', title: 'name' },
  { key: 2, dataIndex: 'age', title: 'age' },
  { key: 3, dataIndex: 'address', title: 'address' },
  { key: 4, dataIndex: 'country', title: 'country' },
  {
    key: 5, dataIndex: 'action', title: 'action',
    render: (text, record) => (
      <Button onClick={() => alert(record.name)}>show name</Button>
    )
  },
]

const mockData = [
  { key: 1, name: 'ben', age: 41, address: 'guangdong', country: 'china' },
  { key: 2, name: 'doge', age: 21, address: 'london', country: 'UK' },
  { key: 3, name: 'aya', age: 31, address: 'shanxi', country: 'china' },
  { key: 4, name: 'cat', age: 11, address: 'newyork', country: 'USA' },
  { key: 5, name: 'jack', age: 24, address: 'shenzhen', country: 'china' },
]
class SelectedTable extends Component {
  state = {
    selectedKeys: [1, 2]
  }
  render() {
    const rowSelection = {
      selectedKeys: this.state.selectedKeys,
      onChange: (selectedKeys) => {
        this.setState({ selectedKeys })
      }
    }
    return (
      <Theme>
        <Table data={mockData} columns={mockColumns} rowSelection={rowSelection} />
      </Theme>
    )
  }
}

function SortableTable() {
  const sortableTableColumns = [
    { key: 1, dataIndex: 'name', title: 'name', sortable: true },
    { key: 2, dataIndex: 'age', title: 'age', sortable: true },
    { key: 3, dataIndex: 'address', title: 'address' },
    { key: 4, dataIndex: 'country', title: 'country' },
    {
      key: 5, dataIndex: 'action', title: 'action',
      render: (text, record) => (
        <Button onClick={() => alert(record.name)}>show name</Button>
      )
    },
  ]
  return (
    <Theme>
      <Table columns={sortableTableColumns} data={mockData} />
    </Theme>
  )
}

function FilterableTable()  {
  const filterableTableColumns = [
    { key: 1, dataIndex: 'name', title: 'name', },
    { key: 2, dataIndex: 'age', title: 'age', },
    { key: 3, dataIndex: 'address', title: 'address' },
    { key: 4, dataIndex: 'country', title: 'country', filterable: true },
    {
      key: 5, dataIndex: 'action', title: 'action',
      render: (text, record) => (
        <Button onClick={() => alert(record.name)}>show name</Button>
      )
    },
  ]
  return (
    <Theme>
      <Table columns={filterableTableColumns} data={mockData} />
    </Theme>
  )
}

//compact, tiny, dashed, striped
storiesOf('Table', module)
  .add('default', () => (
    <Theme>
      <Table data={mockData} columns={mockColumns} />
    </Theme>
  ))
  .add('compact', () => (
    <Theme>
      <Table type="compact" data={mockData} columns={mockColumns} />
    </Theme>
  ))
  .add('tiny', () => (
    <Theme>
      <Table type="tiny" data={mockData} columns={mockColumns} />
    </Theme>
  ))
  .add('dashed', () => (
    <Theme>
      <Table type="dashed" data={mockData} columns={mockColumns} />
    </Theme>
  ))
  .add('striped', () => (
    <Theme>
      <Table type="striped" data={mockData} columns={mockColumns} />
    </Theme>
  ))
  .add('selectable table', () => <SelectedTable />)
  .add('sortable table', () => <SortableTable />)
  .add('filterable table', () => <FilterableTable />)

