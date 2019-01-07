import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Checkbox from '../checkbox'
import Dropdown from '../dropdown'
import styles from './styles/styles.less'

const TABLE_CHECKBOX_KEY = 'eds-table-checkbox'
const TABLE_DROPDOWN_KEY = 'eds-table-dropdown'
const SORT_ASC = styles.asc
const SORT_DESC = styles.desc
const SORT_DEFUALT = styles['is-sortable']
const FILTER_ALL = 'All'

export default class Table extends Component {
  static propTypes = {
    type: PropTypes.string,
    data: PropTypes.array,
    columns: PropTypes.array,
    rowSelection: PropTypes.object,
  }

  static defaultProps = {
    data: [],
    columns: [],
  }
  
  constructor(props) {
    super(props)
    this.state = {
      sortOrder: SORT_DEFUALT,
      sortColumn: '',
      filterKey: '',
      filterColumn: '',
    }
  }

  renderHead() {
    const { columns, rowSelection, data } = this.props
    const { sortOrder, sortColumn } = this.state
    const cols = columns.map(col => {
      const { key, title, sortable, filterable, dataIndex } = col
      const handleClick = sortable ? () => this.toggleSorter(col) : null
      let thClassName = []
      let thChildren = [title]
      if (sortable) {
        const sortableClassName = key === sortColumn ? sortOrder : SORT_DEFUALT 
        thClassName.push(sortableClassName)
      }
      if (filterable) {
        const filterOptions = this.getFilterOptions(dataIndex)
        thChildren.push(
          <Dropdown
            key={TABLE_DROPDOWN_KEY}
            type="inline"
            icon={styles['icon-filter']}
            seletedItem={title}
            operationItem={filterOptions}
            itemChange={selectedItem => {
              this.setState({ filterColumn: dataIndex, filterKey: selectedItem })}
            }
          />
        )
      }
      return (
        <th onClick={handleClick} className={thClassName} key={key}>
          {thChildren}
        </th>
      )
    })
    if (rowSelection) {
      const selectedKeysCount = rowSelection.selectedKeys.length
      const isSelectAll = selectedKeysCount === data.length 
      const indeterminate = selectedKeysCount < data.length && selectedKeysCount > 0
      cols.unshift(
        <th key={TABLE_CHECKBOX_KEY}>
          <Checkbox
            checked={isSelectAll}
            indeterminate={indeterminate}
            onChange={this.toggleSelectAll}
          />
        </th>
      )
    }
    return <tr>{cols}</tr>
  }

  renderRow(record) {
    const { columns, rowSelection } = this.props 
    const row = columns.map(col => {
      const { key, dataIndex, render } = col
      const tdText = record[dataIndex]
      const tdContent = typeof render === 'function' ? render(tdText, record) : tdText
      return <td key={key}>{tdContent}</td>
    })
    if (rowSelection) {
      const { selectedKeys } = rowSelection
      const { key } = record
      const selected = Array.isArray(selectedKeys) && selectedKeys.includes(key)
      row.unshift(
        <td key={TABLE_CHECKBOX_KEY}>
          <Checkbox checked={selected} onChange={e => this.handleSelectChange(e, record)} />
        </td>
      )
    }
    return row
  }

  handleSelectChange(e, record) {
    const { selectedKeys, onChange } = this.props.rowSelection
    if (typeof onChange === 'function') {
      const { key } = record
      const selected = e.target.checked
      const selectedRowKeys = selected
        ? [...selectedKeys, key]
        : [...selectedKeys.filter(k => k !== key)]

      onChange(selectedRowKeys)
    }
  }

  toggleSelectAll = e => {
    const { data, rowSelection } = this.props
    const isSelectAll = rowSelection.selectedKeys.length === 0
    let selectedKeys = isSelectAll ? data.map(record => record.key) : []
    rowSelection.onChange(selectedKeys)
  }

  toggleSorter = (col) => {
    const { sortOrder } = this.state
    const sortOrderTypes = [SORT_DEFUALT, SORT_ASC, SORT_DESC]
    const curIndex = sortOrderTypes.indexOf(sortOrder)
    const nextIndex = curIndex >= sortOrderTypes.length - 1 ? 0 : curIndex + 1
    const nextSortOrder = sortOrderTypes[nextIndex]
    this.setState((prevState) => {
      const { key } = col
      return {
        sortOrder: prevState.sortColumn === key ? nextSortOrder : sortOrderTypes[1],
        sortColumn: key
      }
    })
  }

  sortData(data) {
    const { sortOrder, sortColumn } = this.state
    const { columns } = this.props
    const sorterBaseColumn = columns.find(col => col.key === sortColumn)
    if (sorterBaseColumn && sortOrder !== SORT_DEFUALT) {
      const { dataIndex } = sorterBaseColumn
      const ascSorter = (a, b) => {
        if (a[dataIndex] < b[dataIndex]) return -1
        if (a[dataIndex] > b[dataIndex]) return 1
        return 0
      }
      const descSorter = (a, b) => {
        if (a[dataIndex] < b[dataIndex]) return 1
        if (a[dataIndex] > b[dataIndex]) return -1
        return 0
      }
      const sorterMap = {
        [SORT_ASC]: ascSorter,
        [SORT_DESC]: descSorter,
      }
      const sorter = sorterMap[sortOrder] 
      const sortedData = data.sort(sorter)
      return sortedData
    }
    return data
  }
  
  getFilterOptions(columnKey) {
    const { data } = this.props
    const dataKeys = data.map(record => record[columnKey])
    const uniqueKeys = new Set(dataKeys)  
    return [FILTER_ALL, ...uniqueKeys]
  }

  filterData(data) {
    const { filterKey, filterColumn } = this.state
    const filteredData = data.filter(record => record[filterColumn] === filterKey)
    return filteredData.length > 0 ? filteredData : data
  }

  renderBody() {
    let { data, rowSelection } = this.props
    let tableData = this.sortData([...data])
    tableData = this.filterData([...tableData])
    const body = tableData.map(record => {
      const selected = rowSelection && rowSelection.selectedKeys.includes(record.key)
      return <tr className={selected ? 'selected' : ''} key={record.key}>{this.renderRow(record)}</tr>
    })
    return body
  }

  getTableClassName() {
    const { type = '', columns, rowSelection } = this.props
    const classNames = ['table', type]
    const sortable = columns.some(col => col.sortable)
    const filterable = columns.some(col => col.filterable)
    if (rowSelection) {
      classNames.push(styles.selectable)
    }
    if (sortable) {
      classNames.push(styles.sortable)
    }
    if (filterable) {
      classNames.push(styles.filterable)
    }
    return classNames.join(' ')
  }

  render() {
    return (
      <table className={this.getTableClassName()}>
        <thead>{this.renderHead()}</thead>
        <tbody>{this.renderBody()}</tbody>
      </table>
    )
  }
}
