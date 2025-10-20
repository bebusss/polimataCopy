import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
  RefreshControl, TextInput, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { contactsAPI } from '../services/api';

export default function ContactsListScreen({ navigation }) {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dataSource, setDataSource] = useState('');

  useEffect(() => {
    loadContacts();
  }, []);

  useEffect(() => {
    filterContacts();
  }, [contacts, searchQuery, filterStatus]);

  const loadContacts = async () => {
    const result = await contactsAPI.getAll();
    setContacts(result.data);
    setDataSource(result.source || 'backend');
    setRefreshing(false);
  };

  const filterContacts = () => {
    let filtered = contacts;

    // Filtrar por estado
    if (filterStatus !== 'all') {
      filtered = filtered.filter(c => c.status === filterStatus);
    }

    // Filtrar por búsqueda
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query) ||
        (c.company && c.company.toLowerCase().includes(query))
      );
    }

    setFilteredContacts(filtered);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadContacts();
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace('Login');
  };

  const getStatusColor = (status) => {
    if (status === 'new') return '#10b981';
    if (status === 'contacted') return '#f59e0b';
    if (status === 'closed') return '#6b7280';
    return '#10b981';
  };

  const getStatusLabel = (status) => {
    if (status === 'new') return 'Nuevo';
    if (status === 'contacted') return 'Contactado';
    if (status === 'closed') return 'Cerrado';
    return 'Nuevo';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('detail', { contact: item, onUpdate: loadContacts })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={[styles.badge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.badgeText}>{getStatusLabel(item.status)}</Text>
        </View>
      </View>
      <Text style={styles.email}>{item.email}</Text>
      {item.company && <Text style={styles.company}>🏢 {item.company}</Text>}
      <Text style={styles.message} numberOfLines={2}>{item.message}</Text>
      <Text style={styles.date}>📅 {formatDate(item.created_at)}</Text>
    </TouchableOpacity>
  );

  const FilterButton = ({ value, label }) => (
    <TouchableOpacity
      style={[styles.filterBtn, filterStatus === value && styles.filterBtnActive]}
      onPress={() => setFilterStatus(value)}
    >
      <Text style={[styles.filterBtnText, filterStatus === value && styles.filterBtnTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contactos</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Salir</Text>
        </TouchableOpacity>
      </View>

      {/* Data source indicator */}
      <View style={styles.sourceIndicator}>
        <Text style={styles.sourceText}>
          {dataSource === 'backend' ? '🟢 Conectado al backend' : '🟡 Usando datos de prueba'}
        </Text>
      </View>

      {/* Search */}
      <TextInput
        placeholder="Buscar contactos..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />

      {/* Filters */}
      <View style={styles.filters}>
        <FilterButton value="all" label="Todos" />
        <FilterButton value="new" label="Nuevos" />
        <FilterButton value="contacted" label="Contactados" />
        <FilterButton value="closed" label="Cerrados" />
      </View>

      {/* List */}
      <FlatList
        data={filteredContacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay contactos</Text>
          </View>
        }
        contentContainerStyle={filteredContacts.length === 0 ? styles.emptyList : styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6366f1',
    padding: 16,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: '700',
  },
  logoutBtn: {
    padding: 8,
  },
  logoutText: {
    color: 'white',
    fontSize: 14,
  },
  sourceIndicator: {
    backgroundColor: '#fff',
    padding: 8,
    alignItems: 'center',
  },
  sourceText: {
    fontSize: 12,
    color: '#666',
  },
  searchInput: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  filters: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 8,
    gap: 8,
  },
  filterBtn: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6366f1',
    backgroundColor: 'white',
  },
  filterBtnActive: {
    backgroundColor: '#6366f1',
  },
  filterBtnText: {
    textAlign: 'center',
    color: '#6366f1',
    fontSize: 12,
    fontWeight: '600',
  },
  filterBtnTextActive: {
    color: 'white',
  },
  list: {
    padding: 8,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    color: '#000',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '700',
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  company: {
    fontSize: 13,
    color: '#888',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  emptyList: {
    flexGrow: 1,
  },
});
