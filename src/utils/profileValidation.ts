/**
 * Modul Validasi Form Profil Pengguna (Nomor 1)
 * Dibuat untuk memvalidasi input pada form "Input your profile"
 * Aturan bisnis:
 * - First Name: Wajib diisi, hanya huruf/spasi/apostrof, max 50 karakter
 * - Middle Name: Opsional, jika diisi hanya boleh berisi huruf
 * - Last Name: Opsional, jika diisi hanya boleh berisi huruf
 * - Nickname: Wajib diisi, max 30 karakter
 * - Gender: Male / Female (default Male)
 * - Birth Date: Wajib diisi, format "DD MMM YYYY", tanggal valid, tidak boleh di masa depan
 */

export interface ProfileFormData {
  firstName: string;
  middleName: string;
  lastName: string;
  nickname: string;
  gender: 'Male' | 'Female';
  birthDate: string;
}

export type FormErrors = Partial<Record<keyof ProfileFormData, string>>;

// Pemetaan nama bulan (bahasa Inggris 3 huruf & nama lengkap) ke indeks bulan 0-11
const MONTHS: Record<string, number> = {
  jan: 0, january: 0,
  feb: 1, february: 1,
  mar: 2, march: 2,
  apr: 3, april: 3,
  may: 4,
  jun: 5, june: 5,
  jul: 6, july: 6,
  aug: 7, august: 7,
  sep: 8, september: 8,
  oct: 9, october: 9,
  nov: 10, november: 10,
  dec: 11, december: 11,
};

// Regex untuk validasi nama: hanya huruf alfabet latin, spasi, tanda hubung (-), dan petik satu (')
const NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;

/**
 * Validasi string tanggal lahir dengan format DD MMM YYYY (contoh: 15 Aug 1998)
 * Memeriksa format teks, keabsahan kalender (contoh: tolak 31 Feb), dan memastikan bukan tanggal di masa depan.
 */
export function validateBirthDate(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) {
    return 'Birth Date wajib diisi';
  }

  // Cek struktur format DD MMM YYYY
  const regex = /^(\d{1,2})\s+([A-Za-z]{3,9})\s+(\d{4})$/;
  const match = trimmed.match(regex);
  if (!match) {
    return 'Format tanggal harus DD MMM YYYY (contoh: 15 Aug 1998)';
  }

  const day = parseInt(match[1], 10);
  const monthKey = match[2].toLowerCase();
  const year = parseInt(match[3], 10);

  if (!(monthKey in MONTHS)) {
    return 'Format tanggal harus DD MMM YYYY (contoh: 15 Aug 1998)';
  }

  const monthIndex = MONTHS[monthKey];
  const parsedDate = new Date(year, monthIndex, day);

  // Pastikan tanggal benar-benar ada di kalender (Date constructor JS otomatis rollover jika tidak dicek)
  if (
    parsedDate.getFullYear() !== year ||
    parsedDate.getMonth() !== monthIndex ||
    parsedDate.getDate() !== day ||
    year < 1900
  ) {
    return 'Tanggal lahir tidak valid';
  }

  // Tanggal lahir tidak boleh melampaui hari ini
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  if (parsedDate > today) {
    return 'Tanggal lahir tidak boleh di masa depan';
  }

  return undefined;
}

/**
 * Validasi form profil secara menyeluruh
 * Mengembalikan objek error per field jika ditemukan data tidak valid
 */
export function validateProfileForm(formData: ProfileFormData): FormErrors {
  const errors: FormErrors = {};

  // 1. First Name (Wajib)
  const first = formData.firstName.trim();
  if (!first) {
    errors.firstName = 'First Name wajib diisi';
  } else if (!NAME_REGEX.test(first)) {
    errors.firstName = 'First Name hanya boleh berisi huruf';
  } else if (first.length > 50) {
    errors.firstName = 'First Name maksimal 50 karakter';
  }

  // 2. Middle Name (Opsional, tapi jika diisi harus valid)
  const middle = formData.middleName.trim();
  if (middle && !NAME_REGEX.test(middle)) {
    errors.middleName = 'Middle Name hanya boleh berisi huruf';
  }

  // 3. Last Name (Opsional, tapi jika diisi harus valid)
  const last = formData.lastName.trim();
  if (last && !NAME_REGEX.test(last)) {
    errors.lastName = 'Last Name hanya boleh berisi huruf';
  }

  // 4. Nickname (Wajib)
  const nick = formData.nickname.trim();
  if (!nick) {
    errors.nickname = 'Nickname wajib diisi';
  } else if (nick.length > 30) {
    errors.nickname = 'Nickname maksimal 30 karakter';
  }

  // 5. Birth Date (Wajib)
  const birthDateError = validateBirthDate(formData.birthDate);
  if (birthDateError) {
    errors.birthDate = birthDateError;
  }

  return errors;
}
