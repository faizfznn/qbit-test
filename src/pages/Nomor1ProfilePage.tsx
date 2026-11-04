import React, { useState } from 'react';
import { ArrowLeft, Calendar, CheckCircle2 } from 'lucide-react';
import { InputField } from '../components/ui/InputField';
import { RadioGroup } from '../components/ui/RadioGroup';
import { Button } from '../components/ui/Button';
import {
  ProfileFormData,
  FormErrors,
  validateProfileForm,
} from '../utils/profileValidation';

/*
 Halaman Nomor 1 — Form "Input your profile"
*/
export const Nomor1ProfilePage: React.FC = () => {
  // state data form profil pengguna
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: '',
    middleName: '',
    lastName: '',
    nickname: '',
    gender: 'Male',
    birthDate: '',
  });

  // state pesan error
  const [errors, setErrors] = useState<FormErrors>({});

  // state untuk meyimpan data profile
  const [savedData, setSavedData] = useState<ProfileFormData | null>(null);

  // state pesan navigasi saat tombol Back diklik
  const [navMessage, setNavMessage] = useState<string | null>(null);

  // handler perubahan input nilai form
  const handleChange = <K extends keyof ProfileFormData>(
    field: K,
    value: ProfileFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSavedData(null);
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // handler submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNavMessage(null);

    const validationErrors = validateProfileForm(formData);
    setErrors(validationErrors);

    // save data profil
    if (Object.keys(validationErrors).length === 0) {
      setSavedData({
        ...formData,
        firstName: formData.firstName.trim(),
        middleName: formData.middleName.trim(),
        lastName: formData.lastName.trim(),
        nickname: formData.nickname.trim(),
        birthDate: formData.birthDate.trim(),
      });
    } else {
      setSavedData(null);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-start sm:justify-center py-0 sm:py-8 px-0 sm:px-4">
      <div className="w-full max-w-[390px] bg-white min-h-screen sm:min-h-0 sm:rounded-2xl sm:border sm:border-zinc-200 sm:shadow-sm px-6 py-6 flex flex-col">
        <div className="flex items-center justify-between text-xs font-semibold text-zinc-900 mb-5 select-none">
          <span>08:34</span>
          <div className="flex items-center gap-1.5">
            <span>4G</span>
            <span className="inline-block w-5 h-2.5 border border-zinc-900 rounded-xs p-0.5">
              <span className="block w-full h-full bg-zinc-900" />
            </span>
          </div>
        </div>

        {/* header aplikasi */}
        <header className="flex items-center gap-3 mb-6">
          <Button
            type="button"
            variant="icon"
            aria-label="Back"
            testId="btn-back"
            onClick={() => setNavMessage('Kembali ke halaman sebelumnya')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1
            data-testid="page-title"
            className="text-lg font-bold tracking-tight text-zinc-900"
          >
            Input your profile
          </h1>
        </header>

        {/* tampilan pesan umpan balik tombol Back */}
        {navMessage && (
          <div
            role="status"
            data-testid="nav-message"
            className="mb-4 rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-xs font-medium text-zinc-700"
          >
            {navMessage}
          </div>
        )}

        {/* form isian data profil */}
        <main className="flex-1">
          <form
            onSubmit={handleSubmit}
            noValidate
            data-testid="profile-form"
            className="space-y-4"
          >
            {/* Field First Name (Wajib) */}
            <InputField
              id="firstName"
              label="First Name"
              placeholder="e.g Joel"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              error={errors.firstName}
              testId="input-first-name"
              errorTestId="error-first-name"
            />

            {/* Field Middle Name (Opsional) */}
            <InputField
              id="middleName"
              label="Middle Name"
              optional
              placeholder="e.g K"
              value={formData.middleName}
              onChange={(e) => handleChange('middleName', e.target.value)}
              error={errors.middleName}
              testId="input-middle-name"
              errorTestId="error-middle-name"
            />

            {/* Field Last Name (Opsional) */}
            <InputField
              id="lastName"
              label="Last Name"
              optional
              placeholder="e.g Osteen"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              error={errors.lastName}
              testId="input-last-name"
              errorTestId="error-last-name"
            />

            {/* Field Nickname (Wajib) */}
            <InputField
              id="nickname"
              label="Nickname"
              placeholder="Nickname"
              value={formData.nickname}
              onChange={(e) => handleChange('nickname', e.target.value)}
              error={errors.nickname}
              testId="input-nickname"
              errorTestId="error-nickname"
            />

            {/* Pilihan Gender (Male / Female, default: Male) */}
            <RadioGroup
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={(val) => handleChange('gender', val)}
              options={[
                { label: 'Male', value: 'Male', testId: 'radio-gender-male' },
                { label: 'Female', value: 'Female', testId: 'radio-gender-female' },
              ]}
            />

            {/* Field Birth Date (Wajib) */}
            <InputField
              id="birthDate"
              label="Birth Date"
              placeholder="DD MMM YYYY"
              leftIcon={<Calendar className="w-4 h-4" />}
              value={formData.birthDate}
              onChange={(e) => handleChange('birthDate', e.target.value)}
              error={errors.birthDate}
              testId="input-birth-date"
              errorTestId="error-birth-date"
            />

            {/* Tombol Simpan (Save) */}
            <div className="pt-2">
              <Button type="submit" variant="primary" fullWidth testId="btn-save">
                Save
              </Button>
            </div>
          </form>

          {/* Banner notifikasi sukses simpan profil */}
          {savedData && (
            <div
              role="alert"
              data-testid="save-success"
              className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-3.5 text-xs text-emerald-900"
            >
              <div className="flex items-center gap-2 font-semibold mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Profil berhasil disimpan</span>
              </div>
              <p data-testid="saved-summary" className="text-emerald-800">
                {[savedData.firstName, savedData.middleName, savedData.lastName]
                  .filter(Boolean)
                  .join(' ')}{' '}
                ({savedData.nickname}) — {savedData.gender}, {savedData.birthDate}
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
