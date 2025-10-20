import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Linking
} from 'react-native';
import { contactsAPI } from '../services/api';

export default function ContactDetailScreen({ route, navigation }) {
  const { contact: initialContact, onUpdate } = route.params;
  const [contact, setContact] = useState(initialContact);
  const [updating, setUpdating] = useState(false);

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
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleUpdateStatus = async (newStatus) => {
    if (updating) return;

    setUpdating(true);
    const result = await contactsAPI.updateStatus(contact.id, newStatus);

    if (result.success) {
      setContact({ ...contact, status: newStatus });
      Alert.alert('Éxito', 'Estado actualizado correctamente');
      if (onUpdate) onUpdate(); // Refrescar lista al volver
    } else {
      Alert.alert('Error', 'No se pudo actualizar el estado');
    }
    setUpdating(false);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${contact.email}`);
  };

  const handlePhone = () => {
    if (contact.phone) {
      Linking.openURL(`tel:${contact.phone}`);
    }
  };

  return (
    <View style={styles.wrapper}>
      {/* Custom Header */}
      <View style={styles.customHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalle de Contacto</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.container}>
      {/* Header Card */}
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.name}>{contact.name}</Text>
          <View style={[styles.badge, { backgroundColor: getStatusColor(contact.status) }]}>
            <Text style={styles.badgeText}>{getStatusLabel(contact.status)}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{contact.email}</Text>
        </View>

        {contact.phone && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Teléfono:</Text>
            <Text style={styles.value}>{contact.phone}</Text>
          </View>
        )}

        {contact.company && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Empresa:</Text>
            <Text style={styles.value}>{contact.company}</Text>
          </View>
        )}

        <View style={styles.infoRow}>
          <Text style={styles.label}>Fecha:</Text>
          <Text style={styles.value}>{formatDate(contact.created_at)}</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.label}>Mensaje:</Text>
        <Text style={styles.message}>{contact.message}</Text>
      </View>

      {/* Actions Card */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Acciones Rápidas</Text>

        <TouchableOpacity style={styles.actionBtn} onPress={handleEmail}>
          <Text style={styles.actionBtnText}>✉️ Enviar Email</Text>
        </TouchableOpacity>

        {contact.phone && (
          <TouchableOpacity style={styles.actionBtn} onPress={handlePhone}>
            <Text style={styles.actionBtnText}>📞 Llamar</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Status Card */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Cambiar Estado</Text>

        <TouchableOpacity
          style={[
            styles.statusBtn,
            contact.status === 'new' && styles.statusBtnNew,
            updating && styles.statusBtnDisabled
          ]}
          onPress={() => handleUpdateStatus('new')}
          disabled={updating || contact.status === 'new'}
        >
          <Text style={[
            styles.statusBtnText,
            contact.status === 'new' && styles.statusBtnTextActive
          ]}>
            Nuevo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.statusBtn,
            contact.status === 'contacted' && styles.statusBtnContacted,
            updating && styles.statusBtnDisabled
          ]}
          onPress={() => handleUpdateStatus('contacted')}
          disabled={updating || contact.status === 'contacted'}
        >
          <Text style={[
            styles.statusBtnText,
            contact.status === 'contacted' && styles.statusBtnTextActive
          ]}>
            Contactado
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.statusBtn,
            contact.status === 'closed' && styles.statusBtnClosed,
            updating && styles.statusBtnDisabled
          ]}
          onPress={() => handleUpdateStatus('closed')}
          disabled={updating || contact.status === 'closed'}
        >
          <Text style={[
            styles.statusBtnText,
            contact.status === 'closed' && styles.statusBtnTextActive
          ]}>
            Cerrado
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomSpace} />
    </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  customHeader: {
    backgroundColor: '#6366f1',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  headerSpacer: {
    width: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 16,
    marginBottom: 8,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    flex: 1,
    color: '#000',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e5e5',
    marginVertical: 16,
  },
  infoRow: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    fontWeight: '600',
  },
  value: {
    fontSize: 14,
    color: '#000',
  },
  message: {
    fontSize: 14,
    color: '#000',
    marginTop: 8,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
    color: '#000',
  },
  actionBtn: {
    backgroundColor: '#6366f1',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  actionBtnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  statusBtn: {
    padding: 14,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#6366f1',
    backgroundColor: 'white',
  },
  statusBtnNew: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  statusBtnContacted: {
    backgroundColor: '#f59e0b',
    borderColor: '#f59e0b',
  },
  statusBtnClosed: {
    backgroundColor: '#6b7280',
    borderColor: '#6b7280',
  },
  statusBtnDisabled: {
    opacity: 0.5,
  },
  statusBtnText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#6366f1',
  },
  statusBtnTextActive: {
    color: 'white',
  },
  bottomSpace: {
    height: 20,
  },
});
