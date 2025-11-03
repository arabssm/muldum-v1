# Design Document

## Overview

The student item edit feature will extend the existing item management system to allow students to modify their temporary item requests. The design leverages the current modal-based architecture and form components while integrating new API endpoints for updating and replacing item requests.

The solution follows the existing pattern of using modals for item interactions and maintains consistency with the current user interface. The edit functionality will be seamlessly integrated into the existing ItemDetailModal component and will reuse the form structure from the main object page.

## Architecture

### Component Architecture

```
ItemDetailModal (Enhanced)
├── Edit Mode Toggle
├── Form Fields (Reused from object.tsx)
├── Validation Logic
└── API Integration Layer

API Layer
├── updateItem() - PATCH /std/items/{item_id}
├── deleteItem() - DELETE /std/items/{item_id} (existing)
└── Error Handling

State Management
├── Edit Mode State
├── Form Data State
├── Loading States
└── Error States
```

### Data Flow

1. **Edit Initiation**: User clicks edit button → Modal switches to edit mode → Form populated with existing data
2. **Form Submission**: User submits → Validation → PATCH request → Success handling → DELETE original → UI refresh
3. **Error Handling**: API errors → User feedback → Form remains open for correction

## Components and Interfaces

### Enhanced ItemDetailModal Component

**Location**: `src/student/component/object/ItemDetailModal.tsx`

**New Props**:
```typescript
interface ItemDetailModalProps {
  item: ItemRequest;
  onClose: () => void;
  hideReason?: boolean;
  onDelete?: () => void;
  onUpdate?: () => void; // New: callback after successful update
  allowEdit?: boolean;   // New: enable edit functionality
}
```

**New State**:
```typescript
interface EditState {
  isEditing: boolean;
  formData: {
    product_name: string;
    quantity: number;
    price: string;
    productLink: string;
    reason: string;
  };
  isLoading: boolean;
  errors: Record<string, string>;
}
```

### New API Functions

**Location**: `src/api/object/apply.ts` (extend existing file)

```typescript
// Update item request
export async function updateItem(itemId: number, updateData: Partial<TempItemRequestDto>) {
  const response = await axiosInstance.patch(`/std/items/${itemId}`, updateData);
  return response.data;
}

// Enhanced delete for edit workflow
export async function deleteItemAfterUpdate(itemId: number) {
  const response = await axiosInstance.delete(`/std/items/${itemId}`);
  return response.data;
}
```

### Form Validation

**Reuse existing validation logic from object.tsx**:
- Product name: Required, non-empty
- Price: Required, positive number
- Quantity: Required, positive integer
- Reason: Required, minimum 10 characters
- Product link: Optional, valid URL format

## Data Models

### TempItemRequestDto (API Request)
```typescript
interface TempItemRequestDto {
  product_name?: string;
  quantity?: number;
  price?: string;        // String representation of Long
  productLink?: string;
  reason?: string;
}
```

### ItemRequest (Frontend Model)
```typescript
interface ItemRequest {
  id: string;
  product_name: string;
  quantity: number;
  price?: string;
  productLink?: string;
  reason: string;
  status: 'INTEMP' | 'PENDING' | 'APPROVED' | 'REJECTED';
}
```

### API Response Models
```typescript
interface UpdateResponse {
  status: string;
  message: string;
}

interface ErrorResponse {
  status: 'REJECTED';
  message: string;
}
```

## Error Handling

### Client-Side Validation
- **Form Validation**: Reuse existing validation from object.tsx
- **Real-time Feedback**: Show validation errors as user types
- **Submit Prevention**: Disable submit button when validation fails

### API Error Handling
- **HTTP 400 (Bad Request)**: Display validation error message from API
- **HTTP 401 (Unauthorized)**: Redirect to login or show auth error
- **HTTP 403 (Forbidden)**: Show permission denied message
- **HTTP 404 (Not Found)**: Show "Item no longer exists" message
- **Network Errors**: Show generic error with retry option

### Error Recovery
- **Validation Errors**: Keep modal open, highlight problematic fields
- **API Errors**: Show error message, allow user to retry or cancel
- **Partial Failures**: If update succeeds but delete fails, log error but continue

## Testing Strategy

### Unit Tests
- Form validation logic
- API request formatting
- Error message handling
- State management during edit flow

### Integration Tests
- Edit modal workflow (view → edit → save → close)
- API integration with mock responses
- Error handling scenarios
- Form data persistence during edit session

### User Acceptance Tests
- Edit button visibility for INTEMP items only
- Form pre-population with existing data
- Successful edit and item replacement
- Error message display and recovery
- Modal behavior (open/close/escape key)

## Implementation Phases

### Phase 1: Modal Enhancement
- Add edit mode toggle to ItemDetailModal
- Implement form fields within modal
- Add basic state management for edit mode

### Phase 2: API Integration
- Implement updateItem API function
- Add form submission handling
- Integrate with existing delete functionality

### Phase 3: Error Handling & Polish
- Implement comprehensive error handling
- Add loading states and user feedback
- Perform testing and bug fixes

### Phase 4: Integration & Testing
- Integrate with existing Box component
- Update parent components to handle edit callbacks
- Comprehensive testing and validation

## Security Considerations

- **Authorization**: Verify user has STUDENT role and owns the item
- **Input Validation**: Sanitize all form inputs before API submission
- **CSRF Protection**: Leverage existing axiosInstance configuration
- **Data Integrity**: Ensure atomic update-delete operations where possible

## Performance Considerations

- **Form Rendering**: Reuse existing form components to minimize bundle size
- **API Calls**: Batch update and delete operations when possible
- **State Updates**: Minimize re-renders during form editing
- **Memory Management**: Properly cleanup event listeners and state on modal close